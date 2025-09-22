// utils/estadisticas.js
export function transaccionesMensuales(movimientos) {
  if (!movimientos || movimientos.length === 0) {
    return { actual: 0, anterior: 0, variacion: 0 };
  }

  const hoy = new Date();
  const mesActual = hoy.getMonth() + 1; // Enero = 1
  const anioActual = hoy.getFullYear();

  // Calcular mes anterior
  let mesAnterior = mesActual - 1;
  let anioAnterior = anioActual;
  if (mesAnterior === 0) {
    mesAnterior = 12; // Diciembre
    anioAnterior -= 1;
  }

  const contarMovs = (mes, anio) =>
    movimientos.filter(m => {
      const [y, mth] = m.fecha.split("-").map(Number);
      return y === anio && mth === mes;
    }).length;

  const totalActual = contarMovs(mesActual, anioActual);
  const totalAnterior = contarMovs(mesAnterior, anioAnterior);

  let variacion = 0;
  if (totalAnterior > 0) {
    variacion = ((totalActual - totalAnterior) / totalAnterior) * 100;
  }

  return {
    actual: totalActual,
    anterior: totalAnterior,
    variacion: variacion.toFixed(2),
  };
}


// Calcula el volumen total (INGRESOS + EGRESOS)
export function calcularVolumenTotal(movs) {
  if (!movs || movs.length === 0) {
    return { actual: 0, anterior: 0, variacion: 0 };
  }

  const hoy = new Date();
  const mesActual = hoy.getMonth() + 1; // 1-12
  const anioActual = hoy.getFullYear();

  // Mes anterior
  let mesAnterior = mesActual - 1;
  let anioAnterior = anioActual;
  if (mesAnterior === 0) {
    mesAnterior = 12;
    anioAnterior -= 1;
  }

  // Función para sumar montos de un mes específico
  const sumarMontosMes = (mes, anio) =>
    movs
      .filter(m => {
        const [y, mth] = m.fecha.split("-").map(Number); // YYYY-MM-DD
        return y === anio && mth === mes;
      })
      .reduce((total, mov) => total + parseFloat(mov.monto), 0);

  const actual = sumarMontosMes(mesActual, anioActual);
  const anterior = sumarMontosMes(mesAnterior, anioAnterior);

  let variacion = 0;
  if (anterior > 0) {
    variacion = ((actual - anterior) / anterior) * 100;
  }

  return {
    actual,
    anterior,
    variacion: variacion.toFixed(2)
  };
}

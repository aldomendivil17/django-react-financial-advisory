export function balanceNeto(movs) {
  const hoy = new Date();
  const mesActual = hoy.getMonth() + 1; // 1-12
  const anioActual = hoy.getFullYear();

  // Calcular mes y año del mes anterior
  let mesAnterior = mesActual - 1;
  let anioAnterior = anioActual;
  if (mesAnterior === 0) {
    mesAnterior = 12;
    anioAnterior -= 1;
  }

  // Función para calcular balance neto de un mes específico
  const balanceMes = (mes, anio) => {
    return movs
      .filter(mov => {
        // Extraemos año y mes desde el string YYYY-MM-DD
        const [y, m] = mov.fecha.split("-").map(Number);
        return y === anio && m === mes;
      })
      .reduce((total, mov) => {
        const monto = parseFloat(mov.monto);
        return mov.tipo.toUpperCase() === "INGRESO"
          ? total + monto
          : total - monto;
      }, 0);
  };

  const actual = balanceMes(mesActual, anioActual);
  const anterior = balanceMes(mesAnterior, anioAnterior);

  // Variación porcentual respecto al mes anterior
  const variacion = anterior === 0 ? 0 : ((actual - anterior) / Math.abs(anterior)) * 100;

  return {
    actual,
    anterior,
    variacion: variacion.toFixed(2) // redondea a 2 decimales
  };
}


export function obtenerColorBalance(balance, ingresosTotales) {
  if (balance.actual >= 0) {
    return "text-green-600"; // Verde
  }

  // Definir umbrales según % de ingresos
  const limiteAmarillo = ingresosTotales * -0.1; // hasta -10%
  const limiteRojo = ingresosTotales * -0.3;     // más de -30%

  balance = balance.actual; // Considerar solo el balance actual
  if (balance < limiteRojo) {
    return "text-red-600"; // Rojo grave
  } else if (balance < limiteAmarillo) {
    return "text-yellow-500"; // Amarillo
  } 
}

export function calcularIngresosTotales(movs) {
  const hoy = new Date();
  const mesActual = hoy.getMonth(); // 0-11
  const anioActual = hoy.getFullYear();

  return movs
    .filter((m) => {
      if (m.tipo.toUpperCase() !== "INGRESO") return false;

      const fecha = new Date(m.fecha);
      return (
        fecha.getMonth() === mesActual &&
        fecha.getFullYear() === anioActual
      );
    })
    .reduce((acc, m) => acc + parseFloat(m.monto), 0);
}

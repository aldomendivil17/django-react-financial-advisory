// src/utils/finanzas.js

// 3. Calcular balances por mes
function calcularBalancePorMes(movs) {
    movs.forEach((mov) => {
  // console.log(
  //   "Fecha:", mov.fecha,
  //   "Tipo:", mov.tipo,
  //   "Monto (string):", mov.monto,
  //   "Monto (número):", parseFloat(mov.monto)
  // );
});
  const balances = {};

movs.forEach((mov) => {
  const [anio, mesStr] = mov.fecha.split("-"); // "2025-09-01" → ["2025", "09", "01"]
  const mes = parseInt(mesStr, 10); // mes correcto 1–12
  const anioNum = parseInt(anio, 10);

  const key = `${anioNum}-${mes}`;

  if (!balances[key]) balances[key] = 0;

  const monto = parseFloat(mov.monto);
  if (mov.tipo.toUpperCase() === "INGRESO") balances[key] += monto;
  else balances[key] -= monto;

  // console.log(`Acumulando ${mov.tipo} ${monto} para ${key}: Balance ahora = ${balances[key]}`);
});

  return balances;
}


// 4. Calcular variación mensual del balance
export function calcularVariacionMensual(movs) {
  const balances = calcularBalancePorMes(movs);

  // Ordenar correctamente los meses por año y mes
  const meses = Object.keys(balances).sort((a, b) => {
    const [aY, aM] = a.split("-").map(Number);
    const [bY, bM] = b.split("-").map(Number);
    return aY === bY ? aM - bM : aY - bY;
  });

  if (meses.length < 2) return 0; // no hay mes anterior

  const mesActual = meses[meses.length - 1];
  const mesAnterior = meses[meses.length - 2];

  const balanceActual = balances[mesActual] || 0;
  const balanceAnterior = balances[mesAnterior] || 0;

  if (balanceAnterior === 0) return 0; // evita Infinity

  const variacion = ((balanceActual - balanceAnterior) / Math.abs(balanceAnterior)) * 100;
  return parseFloat(variacion.toFixed(2));
}


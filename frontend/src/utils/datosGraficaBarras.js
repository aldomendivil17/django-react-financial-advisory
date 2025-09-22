export function calcularIngresosEgresos(movimientos) {
  const hoy = new Date();
  const mesActual = hoy.getMonth(); // 0 = enero
  const anioActual = hoy.getFullYear();

  const ingresos = movimientos
    .filter((m) => {
      if (m.tipo.toUpperCase() !== "INGRESO") return false;
      const fecha = new Date(m.fecha);
      return (
        fecha.getMonth() === mesActual &&
        fecha.getFullYear() === anioActual
      );
    })
    .reduce((acc, m) => acc + parseFloat(m.monto), 0);

  const egresos = movimientos
    .filter((m) => {
      if (m.tipo.toUpperCase() !== "EGRESO") return false;
      const fecha = new Date(m.fecha);
      return (
        fecha.getMonth() === mesActual &&
        fecha.getFullYear() === anioActual
      );
    })
    .reduce((acc, m) => acc + parseFloat(m.monto), 0);

  return [
    { name: "Ingresos", value: ingresos },
    { name: "Egresos", value: egresos },
  ];
}

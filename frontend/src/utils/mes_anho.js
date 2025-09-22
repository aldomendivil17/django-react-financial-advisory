export function mes_anho() {
    const fecha = new Date();
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const mesAno = `${meses[fecha.getMonth()]} ${fecha.getFullYear()}`; // "Septiembre 2025"
        return mesAno;
    }
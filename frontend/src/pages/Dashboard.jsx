import { useState, useEffect } from "react";
import axios from "axios";
import GraficaPastel from "../components/GraficaPastel";
import GraficaBarras from "../components/GraficaBarras";
import { calcularVariacionMensual } from "../utils/finanzas";
import { calcularVolumenTotal } from "../utils/volumenTotal";
import { transaccionesMensuales } from "../utils/TransaccionesMensual";
import { calcularIngresosEgresos } from "../utils/datosGraficaBarras";
import { balanceNeto, obtenerColorBalance, calcularIngresosTotales } from "../utils/balanceNeto";
import { mes_anho } from "../utils/mes_anho";


export default function Dashboard() {
  const [movimientos, setMovimientos] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [variacion, setVariacion] = useState(0);
  const [volumenTotal, setVolumenTotal] = useState({ actual: 0, anterior: 0, variacion: 0 });
  const [transacciones, setTransacciones] = useState({ actual: 0, anterior: 0, variacion: 0 });
  const [mesAno, setMesAno] = useState("");
  const ingresosTotales = calcularIngresosTotales(movimientos);
  // const color = obtenerColorBalance(balance, ingresosTotales);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/movimientos/", { withCredentials: true })
      .then((res) => {
        setMovimientos(res.data);

        setChartData(calcularIngresosEgresos(res.data));
        setBalance(balanceNeto(res.data));
        setVariacion(calcularVariacionMensual(res.data));
        setVolumenTotal(calcularVolumenTotal(res.data));
        setTransacciones(transaccionesMensuales(res.data));
        setMesAno(mes_anho());

        console.log("Movimientos:", res.data);
        console.log("Balance:", balanceNeto(res.data));


      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // alert("No estás autenticado. Por favor inicia sesión.");
          window.location.href = "/login";
        } else {
          console.error(err);
        }
      });
  }, []);

  

  return (
    <div className="flex-1 p-6 pt-0 bg-gray-100 overflow-auto">
      {/* Primer bloque con 3 cards */}
      <div className="mx-auto py-2 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 pr-2">Dashboard</h1>
          <h3 className="text-2xl font-semibold text-[#4b0082] pt-2">
            {mesAno}
          </h3>
        </div>

        <div className="flex gap-6">
          {/* Card 1 */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 pl-10">
            <div className="flex mt-3">
              <h3 className="text-base font-semibold mb-2">Volumen total</h3>
              <h3 className="text-gray-700 ml-2">(Ingresos + Egresos)</h3>
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex mt-3">
                <h2 className="text-3xl font-bold font-sans mr-2">
                  $
                  {volumenTotal.actual.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h2>
                <h3 className="text-gray-700 mt-3">MXN</h3>
              </div>
              <div className="flex mt-6">
                <p
                  className={`text-base font-semibold mr-1 ${
                    volumenTotal.variacion >= 0 ? "text-[#2E8524]" : "text-red-600"
                  }`}
                >
                  {volumenTotal.variacion >= 0 ? `+${volumenTotal.variacion}%` : `${volumenTotal.variacion}%`}
                </p>
                <h3 className="text-gray-700">del mes anterior</h3>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 pl-10">
            <div className="flex mt-3">
              <h3 className="text-base font-semibold mb-2">Balance neto</h3>
              <h3 className="text-gray-700 ml-2">(Ingresos - Egresos)</h3>
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex mt-3">
                <h2 className={`text-3xl font-bold font-sans mr-2  ${obtenerColorBalance(balance, ingresosTotales)}`}>
                  {balance.actual >= 0
                    ? `+$${balance.actual.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : `-$${Math.abs(balance.actual).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                </h2>
                <h3 className="text-gray-700 mt-3">MXN</h3>
              </div>

              <div className="flex mt-6">
                <p
                  className={`text-base font-semibold mr-1 ${
                    balance.variacion >= 0 ? "text-[#2E8524]" : "text-red-600"
                  }`}
                >
                  {balance.variacion >= 0 ? `+${balance.variacion}%` : `${balance.variacion}%`}
                </p>
                <h3 className="text-gray-700">del mes anterior</h3>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 pl-10">
            <div className="flex mt-3">
              <h3 className="text-base font-semibold mb-2">
                Número de transacciones
              </h3>
              <h3 className="text-gray-700 ml-2">(Mes actual)</h3>
            </div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex mt-3">
                <h2 className="text-3xl font-bold font-sans mr-2">
                  {transacciones.actual}
                </h2>
                <h3 className="text-gray-700 mt-3">Transacciones</h3>
              </div>
              <div className="flex mt-6">
                <p
                  className={`text-base font-semibold mr-1 ${
                    transacciones.variacion >= 0 ? "text-[#2E8524]" : "text-red-600"
                  }`}
                >
                  {transacciones.variacion >= 0 ? `+${transacciones.variacion}%` : `${transacciones.variacion}%`}
                </p>
                <h3 className="text-gray-700">del mes anterior</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto py-2 px-4">
        <div className="flex gap-6">
          {/* Card 1 */}
          <div className="flex-[1] mx-auto py-8 p-10 bg-white rounded-2xl shadow-md mt-4 p-6 pl-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Analisis de movimientos
            </h1>
            <h3 className="text-gray-800 mb-4">
              Detalles sobre tu estado financiero
            </h3>
            <div className="mb-0 mt-8 flex flex items-start justify-start">
              <h3 className="text-gray-800 mb-0 font-bold ">
                Tipo de movimiento
              </h3>
            </div>

            <div className="mt-0 flex flex items-center justify-center">
              {chartData.length > 0 && <GraficaPastel data={chartData} />}
              {/* {chartDataCategorias.length > 0 && (<GraficaBarras data={chartDataCategorias} />)} */}
            </div>
            <div className="flex mt-6 justify-center">
              <h3 className="text-gray-700 font-bold">Balance neto: </h3>
              <h3 className={`text-gray-700 ml-1`}>
                {balance.actual >= 0
                  ? `+$${balance.actual.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : `-$${Math.abs(balance.actual).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-[2] mx-auto py-8 p-10 bg-white rounded-2xl shadow-md mt-4 p-6 pl-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Distribución por Categoría
            </h1>
            <h3 className="text-gray-800 mb-10">
              Analiza la participación de cada categoría en tus finanzas.
            </h3>
            <div className="mb-0 mt-8 flex flex items-start justify-start">
              <h3 className="text-gray-800 mb-0 font-bold mr-64">
                Ingresos por categoría
              </h3>
              <h3 className="text-gray-800 mb-0 font-bold ml-4">
                Egresos por categoría
              </h3>
            </div>
            <div className="mt-0 flex items-center justify-center">
              <div className="flex-[1] mt-6 ">
                {/* {chartDataCategorias.length > 0 && (
                  <GraficaBarras data={chartDataCategorias} />
                )} */}
              </div>
              <div className="flex-[1] mt-6">
                {/* {chartDataCategorias.length > 0 && (
                  <GraficaBarras data={chartDataCategorias} />
                )} */}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-[1] mx-auto py-8 p-10 bg-white rounded-2xl shadow-md mt-4 p-6 pl-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Movimientos
            </h1>
            <h3 className="text-gray-800 mb-10">
              Revisa tus ultimos movimientos
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {movimientos
                .slice() // copia para no mutar el array original
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // orden descendente por fecha
                .slice(0, 10) // tomar los 10 más recientes
                .map((mov, idx) => (
                  <li key={idx} className="flex justify-between border-b pb-1">
                    <span>
                      {mov.fecha
                        ? (() => {
                            const [year, month, day] = mov.fecha.split("-");
                            return `${day}/${month}/${year}`;
                          })()
                        : `Movimiento ${idx + 1}`}
                    </span>
                    <span>{mov.descripcion || `Movimiento ${idx + 1}`}</span>
                    <span
                      className={
                        mov.tipo === "INGRESO"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      ${mov.monto}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

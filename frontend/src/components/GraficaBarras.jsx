import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Componente para tooltip personalizado
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#fff", padding: "5px 10px", border: "1px solid #ccc" }}>
        ${payload[0].value.toFixed(2)}  {/* Aquí solo mostramos el valor formateado */}
      </div>
    );
  }
  return null;
};

export default function GraficaBarras({ data }) {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} /> {/* Usamos el tooltip personalizado */}
        <Bar dataKey="value" fill="#6f4db3" />
      </BarChart>
    </ResponsiveContainer>
  );
}

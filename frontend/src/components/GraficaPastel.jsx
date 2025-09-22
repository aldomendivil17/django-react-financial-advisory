import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#3b1f87", "#6f4db3", "#b39dd6"];

export default function GraficaPastel({ data = [] }) {
  return (
    <div className="flex justify-center">
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => `$${value.toFixed(2)}`} // <-- Formatea como dinero
        />
        <Legend verticalAlign="bottom" height={30} />
      </PieChart>
    </div>
  );
}


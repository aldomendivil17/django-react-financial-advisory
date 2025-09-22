import React from "react";

// Opciones fijas del back
const INGRESO_CATEGORIAS = [
  { value: "SUELDO", label: "Sueldo" },
  { value: "INVERSION", label: "Inversión" },
  { value: "REGALO", label: "Regalo" },
];

const EGRESO_CATEGORIAS = [
  { value: "ALIMENTACION", label: "Alimentación" },
  { value: "TRANSPORTE", label: "Transporte" },
  { value: "RENTAS", label: "Rentas" },
  { value: "SALUD", label: "Salud" },
  { value: "OTROS", label: "Otros" },
];

export default function EditarMovimientoModal({ open, editData, onChange, onSave, onCancel, categorias = [] }) {
  if (!open) return null;

  // Si el tipo es ingreso → mostrar ingreso categorias, si es egreso → mostrar egreso categorias
  const opcionesCategoria =
    editData.tipo === "INGRESO" ? INGRESO_CATEGORIAS : editData.tipo === "EGRESO" ? EGRESO_CATEGORIAS : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Movimiento</h2>

        {/* Tipo */}
        <label className="block mb-2">Tipo</label>
        <select
          name="tipo"
          value={editData.tipo || ""}
          onChange={onChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Seleccione tipo</option>
          <option value="INGRESO">Ingreso</option>
          <option value="EGRESO">Egreso</option>
        </select>

        {/* Categoría */}
        <label className="block mb-2">Categoría</label>
        <select
          name="categoria"
          value={editData.categoria || ""}
          onChange={onChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Seleccione categoría</option>
          {opcionesCategoria.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Monto */}
        <label className="block mb-2">Monto</label>
        <input
          type="number"
          name="monto"
          value={editData.monto || ""}
          onChange={onChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Descripción */}
        <label className="block mb-2">Descripción</label>
        <textarea
          name="descripcion"
          value={editData.descripcion || ""}
          onChange={onChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Fecha */}
        <label className="block mb-2">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={editData.fecha || ""}
          onChange={onChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Botones */}
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-400 text-white">
            Cancelar
          </button>
          <button onClick={onSave} className="px-4 py-2 rounded text-white" style={{ backgroundColor: "#461D93" }}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}


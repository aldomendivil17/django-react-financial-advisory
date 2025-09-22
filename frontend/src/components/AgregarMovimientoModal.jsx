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

const hoy = new Date();
const yyyy = hoy.getFullYear();
const mm = String(hoy.getMonth() + 1).padStart(2, "0");
const dd = String(hoy.getDate()).padStart(2, "0");
const fechaMax = `${yyyy}-${mm}-${dd}`;

export default function AgregarMovimientoModal({ open, onChange, onSave, onCancel, formData, showError }) {
  if (!open) return null;

  const categorias = formData.tipo === "INGRESO" ? INGRESO_CATEGORIAS : EGRESO_CATEGORIAS;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Agregar Movimiento</h2>

        {/* Tipo */}
        <label className="block mb-2">Tipo</label>
        <select name="tipo" value={formData.tipo} onChange={onChange} className="w-full p-2 border rounded mb-4">
          <option value="">Seleccione tipo</option>
          <option value="INGRESO">Ingreso</option>
          <option value="EGRESO">Egreso</option>
        </select>

        {/* Categoría dinámica */}
        <label className="block mb-2">Categoría</label>
        <select name="categoria" value={formData.categoria} onChange={onChange} className="w-full p-2 border rounded mb-4">
          <option value="">Seleccione categoría</option>
          {categorias.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        {/* Monto */}
        <label className="block mb-2">Monto</label>
        <input
          type="number"
          name="monto"
          value={formData.monto}
          onChange={onChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Descripción */}
        <label className="block mb-2">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={onChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Fecha */}
        <label className="block mb-2">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={onChange}
          max={fechaMax} // ✅ bloquea fechas futuras
          className="w-full p-2 border rounded mb-4"
        />

        {showError && (!formData.tipo || !formData.categoria || !formData.monto || !formData.descripcion || !formData.fecha) && (
          <p className="text-red-500 text-sm mb-2">
            Por favor completa todos los campos
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-400 text-white">Cancelar</button>
          <button onClick={onSave} className="px-4 py-2 rounded text-white" style={{ backgroundColor: "#461D93" }}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

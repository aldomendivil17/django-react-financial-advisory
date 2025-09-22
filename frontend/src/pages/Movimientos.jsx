import { useState, useEffect } from "react";
import axios from "axios";
import Editar from "../assets/images/Editar1.png";
import Eliminar from "../assets/images/delete2.png";
import EditarMovimientoModal from "../components/EditarMovimientoModal";
import AgregarMovimientoModal from "../components/AgregarMovimientoModal";

function formatFecha(fechaStr) {
  if (!fechaStr) return "";
  // Forzar la hora local para evitar desfase por zona horaria
  const d = new Date(fechaStr + "T00:00:00");
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function Movimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    fecha: "",
    tipo: "",
    categoria: "", // 👈 un solo campo
    monto: "",
    descripcion: "",
  });
  const [addError, setAddError] = useState(false);
  const [pagina, setPagina] = useState(1);
  const registrosPorPagina = 10;

  const indexUltimo = pagina * registrosPorPagina;
  const indexPrimero = indexUltimo - registrosPorPagina;
  const movimientosPaginados = movimientos.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(movimientos.length / registrosPorPagina);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/movimientos/", { withCredentials: true })
      .then((res) => {
        // console.log("Movimientos recibidos:", res.data);

        // Ordenar de más reciente a más viejo
        const ordenados = res.data.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );

        setMovimientos(ordenados);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("No estás autenticado. Por favor inicia sesión.");
          window.location.href = "/login";
        } else {
          console.error(err);
        }
      });
  }, []);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // Eliminar movimiento
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este movimiento?")) return;
    const csrftoken = getCookie("csrftoken");
    await axios.delete(`http://127.0.0.1:8000/api/movimientos/${id}/`, {
      withCredentials: true,
      headers: { "X-CSRFToken": csrftoken },
    });
    setMovimientos(movimientos.filter((m) => m.id !== id));
  };

  // Editar movimiento (modal simple)
  const handleEdit = (mov, movId) => {
    setEditId(movId);
    setEditData({ ...mov });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    const csrftoken = getCookie("csrftoken");
    await axios.put(
      `http://127.0.0.1:8000/api/movimientos/${editId}/`,
      editData,
      {
        withCredentials: true,
        headers: { "X-CSRFToken": csrftoken },
      }
    );
    // Refrescar la lista desde el backend
    const res = await axios.get("http://127.0.0.1:8000/api/movimientos/", {
      withCredentials: true,
    });
    setMovimientos(res.data);
    setEditId(null);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  // Abrir modal agregar
  const handleOpenAdd = () => {
    setAddForm({
      fecha: "",
      tipo: "",
      categoria: "",
      monto: "",
      descripcion: "",
    });
    setAddError(false);
    setShowAddModal(true);
  };

  // Cerrar modal agregar
  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  // Cambios en el formulario agregar
  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleAddSave = async () => {
    if (
      !addForm.fecha ||
      !addForm.tipo ||
      !addForm.categoria ||
      !addForm.monto ||
      !addForm.descripcion
    ) {
      setAddError(true);
      return;
    }
    setAddError(false);

    const csrftoken = getCookie("csrftoken");

    const payload = {
      fecha: addForm.fecha,
      tipo: addForm.tipo,
      categoria: addForm.categoria, // solo este
      monto: addForm.monto,
      descripcion: addForm.descripcion,
    };

    await axios.post("http://127.0.0.1:8000/api/movimientos/", payload, {
      withCredentials: true,
      headers: { "X-CSRFToken": csrftoken },
    });

    const res = await axios.get("http://127.0.0.1:8000/api/movimientos/", {
      withCredentials: true,
    });
    setMovimientos(res.data);
    setShowAddModal(false);
  };

 

  return (
    <div className="flex-1 p-6 pt-0 bg-gray-100 overflow-auto">
      <div className="mx-auto py-2 px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 pr-2">Movimientos</h1>
          <button
            className="text-white px-4 py-2 rounded pt-2 hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: "#461D93" }}
            onClick={handleOpenAdd}
          >
            Agregar Movimiento
          </button>
        </div>
        <div className="flex justify-end mb-4 mt-2"></div>
        <table className="min-w-full bg-white rounded-2xl shadow mb-4 mt-10">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Fecha</th>
              <th className="px-4 py-2 border-b">Tipo</th>
              <th className="px-4 py-2 border-b">Descripción</th>
              <th className="px-4 py-2 border-b">Categoría</th>
              <th className="px-4 py-2 border-b">Monto</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movimientosPaginados.map((m) => (
              <tr key={m.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center">
                  {formatFecha(m.fecha)}
                </td>
                <td
                  className={`px-4 py-2 border-b text-center font-bold ${
                    m.tipo === "INGRESO" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {m.tipo}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {m.descripcion}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {m.categoria}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {m.tipo === "INGRESO" ? "+ " : "- "}
                  {m.monto}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleEdit(m, m.id)}
                    className="inline-block mr-2"
                  >
                    <img
                      src={Editar}
                      alt="Editar"
                      className="w-7 h-7 cursor-pointer transition-transform duration-900 hover:scale-110"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="inline-block"
                  >
                    <img
                      src={Eliminar}
                      alt="Eliminar"
                      className="w-7 h-7 cursor-pointer transition-transform duration-900 hover:scale-110"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paginación */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPagina(num)}
              className={`px-3 py-1 rounded ${
                num === pagina ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Modal agregar movimiento */}
        <AgregarMovimientoModal
          open={showAddModal}
          categorias={categorias} // 👈 solo se usa si es INGRESO
          onChange={handleAddChange}
          onSave={handleAddSave}
          onCancel={handleCancelAdd}
          formData={addForm} // 👈 ahora maneja categoria_ingreso y categoria_egreso
          showError={addError}
        />

        <EditarMovimientoModal
          open={!!editId}
          editData={editData}
          categorias={categorias}
          onChange={handleEditChange}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      </div>
    </div>
  );
}

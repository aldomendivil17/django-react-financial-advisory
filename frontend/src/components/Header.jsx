
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import user from '../assets/images/user.png'

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleLogout = async () => {
    const csrftoken = getCookie("csrftoken");
    await axios.post(
      "http://127.0.0.1:8000/api/logout/",
      {},
      {
        withCredentials: true,
        headers: { "X-CSRFToken": csrftoken }
      }
    );
    window.location.href = "/login";
  };

  return (
    <header className="w-full bg-gray-200 shadow flex justify-between items-center p-4">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-bold text-gray-700">Asesor Financiero</h1>
        <span className="text-gray-700 text-base">Cuida tus finanzas</span>
      </div>
      {/* Imagen de perfil y menú */}
      <div className="relative flex items-center gap-3" ref={menuRef}>
        <span className="text-gray-600 select-none">Hola, Usuario</span>
        <div className="relative">
          <img
            src={user}
            alt="Perfil"
            className="w-10 h-10 rounded-full border cursor-pointer transition-transform duration-100 hover:scale-110"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="absolute right-0 top-12 bg-white border rounded shadow-lg w-40 z-10">
              <a href="/configuracion" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Configuración</a>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

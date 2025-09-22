import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#4B0082' }}>
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Área principal */}
      <div className="flex flex-col flex-1">
        {/* Header arriba */}
        <Header />

        {/* Contenido dinámico */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>

        {/* Footer abajo */}
        <Footer />
      </div>
    </div>
  );
}

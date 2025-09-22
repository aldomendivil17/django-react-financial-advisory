import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const startTime = Date.now(); // Medimos inicio de la petición
      try {
        await axios.get("http://127.0.0.1:8000/api/movimientos/", {
          withCredentials: true,
        });
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
      } finally {
        // Aseguramos un mínimo de 1.5 segundos de spinner
        const elapsed = Date.now() - startTime;
        const minDelay = 1500;
        const remaining = minDelay - elapsed;
        setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
}

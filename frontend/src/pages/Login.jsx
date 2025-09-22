import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/check-auth/", { withCredentials: true });
        if (res.data.authenticated) {
          navigate("/dashboard");
        }
      } catch (err) {
        // No autenticado, no hacer nada
      }
    }
    checkAuth();
  }, [navigate]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async () => {
    try {
      const csrftoken = getCookie("csrftoken");
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { username, password },
        {
          withCredentials: true,
          headers: { "X-CSRFToken": csrftoken }
        }
      );
      if(res.data.success){
        navigate("/dashboard");
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{textAlign: "center", marginTop: "20vh"}}>
      <h2>Login</h2>
      <input placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

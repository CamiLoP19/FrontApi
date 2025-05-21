import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './LoginForm.css';

function LoginForm() {
  const [NombreUsuario, setNombreUsuario] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const err = {};
    if (!NombreUsuario) {
      err.NombreUsuario = "El nombre de usuario es obligatorio";
    }
    if (!Contraseña) {
      err.Contraseña = "La contraseña es obligatoria";
    }
    setErrores(err);
  }, [NombreUsuario, Contraseña]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (Object.keys(errores).length !== 0 || !NombreUsuario || !Contraseña) {
      Swal.fire({
        icon: "error",
        title: "Revisa los campos",
        text: "Completa correctamente todos los campos.",
      });
      return;
    }

    try {
      const response = await fetch("https://localhost:7143/api/Personas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ NombreUsuario, Contraseña }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombreUsuario", data.user.nombreUsuario);
        localStorage.setItem("correo", data.user.correo);

        Swal.fire({
          title: "Inicio de sesión exitoso",
          icon: "success"
        });
      window.location.href = "/Inicio"; // Redirigir a la página de inicio
        // Redirigir si lo deseas según el usuario
        // window.location.href = "/home";
      } else {
        const error = await response.text();
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: error
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
      });
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleLogin} className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <div className="mb-3">
          <label htmlFor="nombreUsuario" className="form-label">Nombre de usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            name="NombreUsuario"
            className="form-control"
            value={NombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
          {errores.NombreUsuario && <span className="text-danger">{errores.NombreUsuario}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="Contraseña"
            className="form-control"
            value={Contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          {errores.Contraseña && <span className="text-danger">{errores.Contraseña}</span>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginForm;


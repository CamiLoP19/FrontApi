import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './RegisterForm.css';

function RegisterForm() {
  const [Correo, setCorreo] = useState('');
  const [NombreUsuario, setNombreUsuario] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [FechaNacimiento, setFechaNacimiento] = useState('');
  const [Rol, setRol] = useState('');
  const [errores, setErrores] = useState({});

  // Validaciones similares al primer ejemplo pero manteniendo la estructura y nombres de variables del segundo
  useEffect(() => {
    const err = {};

    if (NombreUsuario && !/^[A-Za-z\d]{3,20}$/.test(NombreUsuario)) {
      err.NombreUsuario = "Debe tener entre 3 y 20 caracteres, solo letras y números";
    }

    if (Correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Correo)) {
      err.Correo = "Correo electrónico no válido";
    }

    if (Contraseña && (Contraseña.length < 8 || Contraseña.length > 20)) {
      err.Contraseña = "La contraseña debe tener entre 8 y 20 caracteres";
    }

    if (!FechaNacimiento) {
      err.FechaNacimiento = "La fecha de nacimiento es obligatoria";
    }

    if (!Rol) {
      err.Rol = "Selecciona un tipo de cuenta";
    }

    setErrores(err);
  }, [NombreUsuario, Correo, Contraseña, FechaNacimiento, Rol]);

  const handleRegister = async (e) => {
    e.preventDefault();
    // Si hay errores o campos vacíos, mostrar alerta
    if (
      Object.keys(errores).length !== 0 ||
      !Correo || !NombreUsuario || !Contraseña || !FechaNacimiento || !Rol
    ) {
      Swal.fire({
        icon: "error",
        title: "Revisa los campos",
        text: "Completa correctamente todos los campos.",
      });
      return;
    }

    try {
      const response = await fetch("https://localhost:7143/api/Personas/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Correo, NombreUsuario, Contraseña, FechaNacimiento, Rol }),
      });

      const mensaje = await response.text();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: mensaje,
        });
      } else {
        Swal.fire({
          title: mensaje || 'Registro exitoso',
          icon: "success",
          draggable: true
        });
        setCorreo('');
        setNombreUsuario('');
        setContraseña('');
        setFechaNacimiento('');
        setRol('');
      }
    } catch (error) {
      console.log("Error al registrar: " + error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
      });
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleRegister} className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Registro</h2>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            type="email"
            id="correo"
            name="Correo"
            className="form-control"
            value={Correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          {errores.Correo && <span className="text-danger">{errores.Correo}</span>}
        </div>

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
            maxLength={20}
            minLength={3}
            pattern="[A-Za-z\d]+"
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
            minLength={8}
            maxLength={20}
          />
          {errores.Contraseña && <span className="text-danger">{errores.Contraseña}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="FechaNacimiento"
            className="form-control"
            value={FechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
          {errores.FechaNacimiento && <span className="text-danger">{errores.FechaNacimiento}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="Rol" className="form-label">Tipo de cuenta</label>
          <select
            id="Rol"
            name="Rol"
            className="form-select"
            value={Rol}
            onChange={(e) => setRol(e.target.value)}
            required
          >
            <option value="">Selecciona un Rol</option>
            <option value="administrador">Administrador</option>
            <option value="cliente">Cliente</option>
          </select>
          {errores.Rol && <span className="text-danger">{errores.Rol}</span>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        <div className="mt-3 text-center">
          <p className="mb-0">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-decoration-none">Inicia Sesión</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
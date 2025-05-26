import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Sidebar from "../Components/AdminComponents/SideBar";

export default function CrearEvento() {
  const [nombreEvento, setNombreEvento] = useState("");
  const [fechaEvento, setFechaEvento] = useState("");
  const [lugarEvento, setLugarEvento] = useState("");
  const [aforo, setAforo] = useState("");
  const [descripcionEvento, setDescripcionEvento] = useState("");
  const [estadoEventoActivo, setEstadoEventoActivo] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [errores, setErrores] = useState({});
  const rol = localStorage.getItem("rol"); 

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("https://localhost:7143/api/CategoriaEventoes");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías", error);
        Swal.fire("Error", "No se pudieron cargar las categorías.", "error");
      }
    };
    fetchCategorias();
  }, []);

  const validar = () => {
    const err = {};
    if (!nombreEvento) err.nombre = "El nombre es obligatorio";
    if (!fechaEvento) err.fecha = "La fecha es obligatoria";
    if (!lugarEvento) err.lugar = "El lugar es obligatorio";
    if (!aforo || isNaN(aforo) || aforo <= 0)
      err.aforo = "Aforo debe ser un número mayor a 0";
    if (!categoriaSeleccionada) err.categoria = "Selecciona una categoría";
    if (!descripcionEvento) err.descripcion = "La descripción es obligatoria";
    return err;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const err = validar();
  setErrores(err);
  if (Object.keys(err).length > 0) {
    Swal.fire({
      icon: "error",
      title: "Revisa los campos",
      text: "Completa correctamente todos los campos.",
    });
    return;
  }

  // Asegúrate de que categoriaSeleccionada es un número válido
  const categoriaEventoId = parseInt(categoriaSeleccionada, 10);
  if (isNaN(categoriaEventoId) || categoriaEventoId === 0) {
    Swal.fire({
      icon: "error",
      title: "Categoría inválida",
      text: "Selecciona una categoría válida.",
    });
    return;
  }

  // Body plano, SIN eventoDto
  const body = {
    nombreEvento,
    fechaEvento,
    lugarEvento,
    aforo: parseInt(aforo, 10),
    categoriaEventoId,
    descripcionEvento,
    estadoEventoActivo,
  };

  try {
    const response = await fetch("https://localhost:7143/api/Eventoes/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
        title: mensaje || 'Evento creado exitosamente',
        icon: "success",
        draggable: true
      });
      setNombreEvento("");
      setFechaEvento("");
      setLugarEvento("");
      setAforo("");
      setDescripcionEvento("");
      setCategoriaSeleccionada("");
      setEstadoEventoActivo(true);
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
    <div className="container mt-5">
      <Sidebar />
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow"
        style={{ maxWidth: 500, margin: "0 auto" }}
      >
        <h2 className="mb-4 text-center">Crear Evento</h2>

        <div className="mb-3">
          <label className="form-label">Nombre del evento</label>
          <input
            type="text"
            className="form-control"
            value={nombreEvento}
            onChange={(e) => setNombreEvento(e.target.value)}
          />
          {errores.nombre && (
            <span className="text-danger">{errores.nombre}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha del evento</label>
          <input
            type="date"
            className="form-control"
            value={fechaEvento}
            onChange={(e) => setFechaEvento(e.target.value)}
          />
          {errores.fecha && (
            <span className="text-danger">{errores.fecha}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Lugar del evento</label>
          <input
            type="text"
            className="form-control"
            value={lugarEvento}
            onChange={(e) => setLugarEvento(e.target.value)}
          />
          {errores.lugar && (
            <span className="text-danger">{errores.lugar}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Aforo</label>
          <input
            type="number"
            className="form-control"
            value={aforo}
            onChange={(e) => setAforo(e.target.value)}
            min={1}
          />
          {errores.aforo && (
            <span className="text-danger">{errores.aforo}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría</label>
         <select
  className="form-select"
  value={categoriaSeleccionada}
  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
>
  <option value="">Selecciona una categoría</option>
  {categorias.map((cat) => (
    <option key={cat.idCategoriaEvento} value={cat.idCategoriaEvento}>
      {cat.nombre}
    </option>
  ))}
</select>
          {errores.categoria && (
            <span className="text-danger">{errores.categoria}</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcionEvento}
            onChange={(e) => setDescripcionEvento(e.target.value)}
            rows={3}
          />
          {errores.descripcion && (
            <span className="text-danger">{errores.descripcion}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Crear Evento
        </button>
      </form>
    </div>
  );
}
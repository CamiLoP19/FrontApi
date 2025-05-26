import React, { useState, useEffect } from "react";

export default function CrearCategoria() {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [editandoId, setEditandoId] = useState(null); // ID de la categoría que se está editando

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await fetch("https://localhost:7143/api/CategoriaEventoes");
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      setMensaje("Error al obtener categorías.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreCategoria.trim()) return;

    try {
      if (editandoId) {
        // Editar categoría existente
        const response = await fetch(`https://localhost:7143/api/CategoriaEventoes/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idCategoriaEvento: editandoId, nombre: nombreCategoria }),
        });

        if (response.ok) {
          setMensaje("Categoría actualizada.");
        } else {
          setMensaje("Error al actualizar categoría.");
        }
      } else {
        // Crear nueva categoría
        const response = await fetch("https://localhost:7143/api/CategoriaEventoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreCategoria }),
        });

        if (response.ok) {
        setMensaje("Categoría creada exitosamente.");
        } else {
        const data = await response.json();
        setMensaje(data?.message || "Error al crear categoría.");
        }
    }

    setNombreCategoria("");
    setEditandoId(null);
    obtenerCategorias();
    } catch (error) {
    setMensaje("Error de conexión con el servidor.");
    }
};

    const handleEditar = (categoria) => {
    setEditandoId(categoria.idCategoriaEvento);
    setNombreCategoria(categoria.nombre);
};

const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    try {
    const response = await fetch(`https://localhost:7143/api/CategoriaEventoes/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        setMensaje("Categoría eliminada.");
        obtenerCategorias();
    } else {
        setMensaje("Error al eliminar categoría.");
    }
    } catch (error) {
    setMensaje("Error de conexión al eliminar.");
    }
};

  return (
    <div style={{ marginLeft: "240px", padding: "20px" }}>
      <h2>{editandoId ? "Editar Categoría" : "Crear Nueva Categoría"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombreCategoria}
          onChange={(e) => setNombreCategoria(e.target.value)}
          placeholder="Nombre de la categoría"
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          {editandoId ? "Actualizar" : "Crear"}
        </button>
        {editandoId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditandoId(null);
              setNombreCategoria("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {mensaje && <p className="mt-3">{mensaje}</p>}

      <h3 className="mt-4">Categorías Existentes</h3>
      <ul className="list-group">
        {categorias.map((cat) => (
          <li key={cat.idCategoriaEvento} className="list-group-item d-flex justify-content-between align-items-center">
            {cat.nombre}
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditar(cat)}>
                Editar
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(cat.idCategoriaEvento)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

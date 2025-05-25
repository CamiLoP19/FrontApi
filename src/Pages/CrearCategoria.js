import React, { useState } from "react";

export default function CrearCategoria() {
const [nombreCategoria, setNombreCategoria] = useState("");
const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreCategoria.trim()) return;

    try {
    const response = await fetch("https://localhost:7143/api/CategoriaEventoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreCategoria }),
    });

    if (response.ok) {
        setMensaje("Categoría creada exitosamente.");
        setNombreCategoria("");
    } else {
        const data = await response.json();
        setMensaje(data?.message || "Error al crear categoría.");
    }
    } catch (error) {
    setMensaje("Error de conexión con el servidor.");
    }
};

return (
    <div style={{ marginLeft: "240px", padding: "20px" }}>
    <h2>Crear Nueva Categoría</h2>
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={nombreCategoria}
        onChange={(e) => setNombreCategoria(e.target.value)}
        placeholder="Nombre de la categoría"
        className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
        Crear Categoría
        </button>
    </form>
    {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
  );
}

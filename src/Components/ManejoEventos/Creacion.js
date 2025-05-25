import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Creacion.css";




export default function Creacion() {
  return (
    <div className="crearEvento">
      <div className="bg-white container my-4 rounded shadow blur p-4">
        <form className="text-black row p-4 rounded mx-auto">
          <input
            type="file"
            placeholder="Insertar Imagen"
            className="text-black shadow-sm mb-2"
          />
          <input type="text" placeholder="Nombre del evento" className="mb-2" />
          <textarea
            placeholder="Descripción del evento"
            maxLength={200}
            rows={4}
            cols={50}
            style={{ maxBlockSize: "100px" }}
            className="shadow-sm text-black mb-2"
          ></textarea>
          <input
            type="datetime-local"
            placeholder="Fecha del evento"
            className="mb-2"
          />
          <input type="text" placeholder="Lugar Del Evento" className="mb-2" />
          <input
            type="text"
            placeholder="Ubicación del evento"
            className="mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Agregar Evento
          </button>
        </form>
      </div>
    </div>
  );
}

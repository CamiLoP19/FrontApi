import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`sidebar-custom d-flex flex-column flex-shrink-0 p-3 text-white ${
        open ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{
        width: open ? "240px" : "60px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        transition: "width 0.3s",
        overflowX: "hidden",
      }}
    >
      <button
        className="btn btn-outline-light mb-3 toggle-btn"
        style={{
          width: "40px",
          alignSelf: open ? "flex-end" : "center",
          marginBottom: open ? "16px" : "8px",
          transition: "all 0.3s",
        }}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        <i
          className={`bi ${open ? "bi-chevron-left" : "bi-chevron-right"}`}
        ></i>
      </button>
      {open && (
        <div className="mb-4 text-center">
          <h4 className="fw-bold sidebar-title">Panel de Eventos</h4>
          <hr className="border-light" />
        </div>
      )}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/CreacionEventos"
            className={`nav-link d-flex align-items-center ${
              location.pathname === "/CreacionEventos" ? "active" : "text-white"
            }`}
            title="Crear Evento"
          >
            <i className="bi bi-plus-circle me-2 sidebar-icon"></i>
            {open && "Crear Evento"}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Administrar"
            className={`nav-link d-flex align-items-center ${
              location.pathname === "/Administrar" ? "active" : "text-white"
            }`}
            title="Administrar Evento"
          >
            <i className="bi bi-gear me-2 sidebar-icon"></i>
            {open && "Administrar Evento"}
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        <hr className="border-light" />
        {/* Puedes agregar más opciones aquí */}
        {/* <Link to="/logout" className="nav-link text-white">Cerrar sesión</Link> */}
      </div>
    </div>
  );
};

export default Sidebar;

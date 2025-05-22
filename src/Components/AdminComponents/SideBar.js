import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
      style={{ width: '220px', height: '100vh', position: 'fixed' }}
    >
      <h4 className="mb-4 text-center">Panel de Eventos</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link to="/crear-evento" className="nav-link text-white">
            <i className="bi bi-plus-circle me-2"></i> Crear Evento
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/administrar-evento" className="nav-link text-white">
            <i className="bi bi-gear me-2"></i> Administrar Evento
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;


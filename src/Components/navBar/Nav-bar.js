// src/components/Navbar.jsx
// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol'); // Ejemplo: 'admin', 'user', etc.
  const isAuthenticated = !!token;
  const isAdmin = isAuthenticated && rol?.toLowerCase() === 'administrador';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/login');
    window.location.reload(); // Fuerza que Navbar se renderice correctamente

  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/Inicio">Tucopiabatara</Link>
      <div className="navbar-buttons">
        <Link className="btn info" to="/Contact">Contactanos</Link>

        {!isAuthenticated && (
          <>
            <Link className="btn login" to="/login">Iniciar sesión</Link>
            <Link className="btn register" to="/registro">Registrar</Link>
          </>
        )}

        {isAuthenticated && (
          <>
            {isAdmin && (
              
              <Link className="btn admin" to="/CreacionEventos">Crear evento</Link>
              

              
            )}
            <button className="btn logout" onClick={handleLogout}>Cerrar sesión</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



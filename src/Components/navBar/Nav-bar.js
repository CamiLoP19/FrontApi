// src/components/Navbar.jsx
// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">Tucopiabatara</Link>
      <div className="navbar-buttons">
        <Link className="btn info" to="/info">Más información</Link>
        {!isAuthenticated && (
          <>
            <Link className="btn login" to="/login">Iniciar sesión</Link>
            <Link className="btn register" to="/registro">Registrar</Link>
          </>
        )}
        {isAuthenticated && (
          <button className="btn logout" onClick={handleLogout}>Cerrar sesión</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


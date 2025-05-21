// src/components/Navbar.jsx
// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link className="navbar-brand" to="/">Tucopiabatara</Link>
    <div className="navbar-buttons">
      <Link className="btn info" to="/info">Más información</Link>
      <Link className="btn login" to="/login">Iniciar sesión</Link>
      <Link className="btn register" to="/registro">Registrar</Link>
    </div>
  </nav>
);

export default Navbar;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import LoginForm from "./Components/loginForm/LoginForm";
import RegisterForm from "./Components/registerForm/RegisterForm";
import Contact from "./Components/contact/Contact";
import PostsPage from "./Components/postPage/PostsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./Components/inicio/Inicio";
import Comprar from "./Components/comprar/Comprar";
import Navbar from "./Components/navBar/Nav-bar";
import Footer from "./Components/footer/Footer";
import CreacionEventos from "./Pages/CreacionEventos";
import AdministrarEventos from "./Pages/AdministrarEventos";
function App() {
  return (
    <Router>
      {/* Agregamos el Navbar a todas las rutas */}
      <Navbar />
      <Routes>
        {/* Ruta para la página principal, que será PostsPage */}
        <Route path="/" element={<Inicio />} />
        <Route path="/postspage" element={<PostsPage />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/comprar" element={<Comprar />} />
        {/* Rutas para los formularios de inicio de sesión y registro */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registro" element={<RegisterForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/CreacionEventos" element={<CreacionEventos />} />
        <Route path="/Administrar" element={<AdministrarEventos />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;

*/ 
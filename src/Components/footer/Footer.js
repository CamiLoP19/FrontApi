import React from "react";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          {/* Columna 1 */}
          <div className="footer-col">
            <h5>Tu Boleta</h5>
            <ul>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Tuboleta Te Cuenta</a></li>
              <li><a href="#">Términos de Uso</a></li>
              <li><a href="#">Puntos de Venta</a></li>
              <li><a href="#">Asistencia Tuboleta</a></li>
            </ul>
          </div>

          {/* Columna 2 */}
          <div className="footer-col">
            <h5>Categorías</h5>
            <ul>
              <li><a href="#">Conciertos</a></li>
              <li><a href="#">Teatro</a></li>
              <li><a href="#">Deportes</a></li>
              <li><a href="#">Bono Regalo</a></li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div className="footer-col">
            <h5>TICKET FAST SAS</h5>
            <p>NIT. 01000010-01011000</p>
            <p>Calle 18 No. 32 - 24</p>
            <p>Valledupar</p>
          </div>

          {/* Columna 4 */}
          <div className="footer-col">
            <h5>SÍGUENOS</h5>
            <p>Síguenos en nuestras Redes Sociales y mantente enterado de los mejores eventos.</p>
            <div className="footer-social">
              <a href="https://twitter.com"><i className="bi bi-twitter"></i></a>
              <a href="https://facebook.com"><i className="bi bi-facebook"></i></a>
              <a href="https://instagram.com"><i className="bi bi-instagram"></i></a>
              <a href="https://youtube.com"><i className="bi bi-youtube"></i></a>
              <a href="https://linkedin.com"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 EventosU - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../footer/Footer";
function Contactanos() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Contáctanos</h1>
        <p className="text-muted">
          ¿Tienes dudas o necesitas ayuda? Estamos para ayudarte.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h4 className="mb-3">Formulario de contacto</h4>
            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">
                  Mensaje
                </label>
                <textarea
                  className="form-control"
                  id="mensaje"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p>
          También puedes escribirnos a: <strong>soporte@tuboletaweb.com</strong>
        </p>
        <p>
          O llamarnos al: <strong>01 8000 123 456</strong>
        </p>
      </div>

      {/* FOOTER */}
      <Footer></Footer>
    </div>
  );
}

export default Contactanos;

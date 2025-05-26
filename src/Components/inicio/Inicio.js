
import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ← AÑADE useNavigate AQUÍ


export default function Inicio() {
  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [lugarFiltro, setLugarFiltro] = useState('');
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [image, setImage] = useState(null);
  const seccionRefs = useRef({});
 const navigate = useNavigate(); // ← DEFINE navigate AQUÍ


  useEffect(() => {
    // Cargar eventos
    fetch("https://localhost:7143/api/Eventoes")
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(() => setEventos([]));
    // Cargar categorías
    fetch("https://localhost:7143/api/CategoriaEventoes")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(() => setCategorias([]));
  }, []);

  // Opciones del select de categorías (todos + backend)
  const categoriasSelect = [
    { key: 'todos', label: 'Todos' },
    ...categorias.map(cat => ({
      key: cat.idCategoriaEvento?.toString(),
      label: cat.nombre
    }))
  ];

  // Filtrar eventos según filtros activos
  const eventosFiltrados = eventos.filter(e => {
    const categoriaMatch = categoriaActiva === 'todos' || String(e.categoriaEventoId) === categoriaActiva;
    const lugarMatch = !lugarFiltro || (e.lugarEvento && e.lugarEvento.toLowerCase().includes(lugarFiltro.toLowerCase()));
    const fechaMatch = !fechaFiltro || (e.fechaEvento && e.fechaEvento.slice(0, 10) === fechaFiltro);
    return categoriaMatch && lugarMatch && fechaMatch;
  });

  // Agrupa eventos por categoría para mostrar secciones solo cuando está "todos"
  const eventosPorCategoria = {};
  for (const evento of eventosFiltrados) {
    const key = String(evento.categoriaEventoId);
    if (!eventosPorCategoria[key]) eventosPorCategoria[key] = [];
    eventosPorCategoria[key].push(evento);
  }

  const handlePostClick = (evento) => {
    setSelectedPost(evento);
    setImage(evento.imagenUrl || evento.imagen || "https://placehold.co/600x400?text=Sin+Imagen");
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleComprar = () => {
  localStorage.setItem('eventoSeleccionado', JSON.stringify(selectedPost));
};


  return (
    <>
      <div className="container mt-4">
        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setCategoriaActiva(e.target.value)} value={categoriaActiva}>
              {categoriasSelect.map(cat => (
                <option key={cat.key} value={cat.key}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Lugar..."
              value={lugarFiltro}
              onChange={(e) => setLugarFiltro(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
            />
          </div>
        </div>

        {/* Mostrar por categorías cuando está "todos" */}
        {categoriaActiva === 'todos' ? (
          categorias.map(cat => {
            const eventosCat = eventosPorCategoria[String(cat.idCategoriaEvento)] || [];
            if (eventosCat.length === 0) return null;
            return (
              <section
                key={cat.idCategoriaEvento}
                className="mb-5 categoria-seccion"
                data-categoria={cat.idCategoriaEvento}
                ref={el => seccionRefs.current[cat.idCategoriaEvento] = el}
              >
                <h3 className="text-warning mb-3">{cat.nombre}</h3>
                <div className="row g-4">
                  {eventosCat.map((e, i) => (
                    <div className="col-md-6 col-lg-4" key={e.idEvento || i}>
                      <div className="card h-100 shadow-lg rounded-3">
                        <img
                          src={e.imagenUrl || e.imagen || "https://placehold.co/600x400?text=Sin+Imagen"}
                          className="card-img-top"
                          alt={e.nombreEvento}
                          style={{ height: '250px', objectFit: 'cover', borderRadius: '10px' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title text-center text-uppercase">{e.nombreEvento}</h5>
                          <p className="card-text text-center"><strong>{e.lugarEvento}</strong></p>
                          <p className="card-text text-center">{e.fechaEvento && e.fechaEvento.slice(0, 10)}</p>
                          <button className="btn btn-primary mt-auto" onClick={() => handlePostClick(e)}>
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          // Si hay categoría seleccionada, mostrar solo esa
          <>
            {eventosFiltrados.length === 0 ? (
              <div className="alert alert-warning">No hay eventos para esta categoría.</div>
            ) : (
              <section>
                <h3 className="text-warning mb-3">{categorias.find(c => String(c.idCategoriaEvento) === categoriaActiva)?.nombre || 'Eventos'}</h3>
                <div className="row g-4">
                  {eventosFiltrados.map((e, i) => (
                    <div className="col-md-6 col-lg-4" key={e.idEvento || i}>
                      <div className="card h-100 shadow-lg rounded-3">
                        <img
                          src={e.imagenUrl || e.imagen || "https://placehold.co/600x400?text=Sin+Imagen"}
                          className="card-img-top"
                          alt={e.nombreEvento}
                          style={{ height: '250px', objectFit: 'cover', borderRadius: '10px' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title text-center text-uppercase">{e.nombreEvento}</h5>
                          <p className="card-text text-center"><strong>{e.lugarEvento}</strong></p>
                          <p className="card-text text-center">{e.fechaEvento && e.fechaEvento.slice(0, 10)}</p>
                          <button className="btn btn-primary mt-auto" onClick={() => handlePostClick(e)}>
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.nombreEvento}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image && (
            <img
              src={image}
              alt={selectedPost?.nombreEvento}
              className="img-fluid mb-4"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}
          <p><strong>Lugar:</strong> {selectedPost?.lugarEvento}</p>
          <p><strong>Fecha del evento:</strong> {selectedPost?.fechaEvento && selectedPost?.fechaEvento.slice(0, 10)}</p>
          <p>{selectedPost?.descripcionEvento}</p>
        </Modal.Body>
        <Modal.Footer>
              <Button
          variant="success"
          onClick={() => navigate(`/comprar?eventoId=${selectedPost.eventoId}`)}
>
  Comprar
</Button>

          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

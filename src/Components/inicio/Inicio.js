import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import imgcine from "../imagenes/cine.jpg";
import imgconcierto from "../imagenes/concierto.avif";
import imgteatro from "../imagenes/teatro.jpg";
import imgotro from "../imagenes/otro.jpg";
import imgdeporte from "../imagenes/deporte.jpg";
import './Inicio.css';

export default function Inicio() {
  const [lugarFiltro, setLugarFiltro] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [image, setImage] = useState(null);
  const seccionRefs = useRef({});

  const eventosData = {
    concierto: [
      {
        imagen: imgconcierto,
        titulo: 'Concierto Rock',
        lugar: 'Bogotá – Estadio El Campín',
        fecha: '12 de junio, 8:00 PM',
        descripcion: 'Una noche inolvidable con las mejores bandas de rock nacionales e internacionales.'
      }
    ],
    cine: [
      {
        imagen: imgcine,
        titulo: 'Estreno: Película X',
        lugar: 'Medellín – Cine Colombia',
        fecha: '15 de junio, 6:00 PM',
        descripcion: 'Disfruta del estreno más esperado del año con palomitas gratis para los primeros 50 asistentes.'
      }
    ],
    deporte: [
      {
        imagen: imgdeporte,
        titulo: 'Partido de Fútbol',
        lugar: 'Cali – Estadio Pascual Guerrero',
        fecha: '20 de junio, 5:00 PM',
        descripcion: 'Clásico regional con muchas emociones. ¡No te lo pierdas!'
      }
    ],
    teatro: [
      {
        imagen: imgteatro,
        titulo: 'Obra Clásica',
        lugar: 'Medellín – Teatro Pablo Tobón',
        fecha: '25 de junio, 7:00 PM',
        descripcion: 'Una puesta en escena imperdible de una obra que marcó la historia del teatro.'
      }
    ],
    otro: [
      {
        imagen: imgotro,
        titulo: 'Charla motivacional',
        lugar: 'Cali – Teatro Municipal Enrique Buenaventura',
        fecha: '20 de junio, 2:00 PM',
        descripcion: 'Inspiración y herramientas para transformar tu vida con expertos en desarrollo personal.'
      }
    ]
  };

  const categorias = [
    { key: 'todos', label: 'Todos' },
    { key: 'deporte', label: '🏀 Deporte' },
    { key: 'concierto', label: '🎤 Concierto' },
    { key: 'cine', label: '🎬 Cine' },
    { key: 'teatro', label: '🎭 Teatro' },
    { key: 'otro', label: '🧠 Otro' }
  ];

  const convertirFechaISO = (fechaTexto) => {
    const match = fechaTexto.match(/^(\d{1,2}) de (\w+)/);
    if (!match) return '';
    const dia = match[1].padStart(2, '0');
    const mesNombre = match[2].toLowerCase();
    const meses = {
      enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
      julio: '07', agosto: '08', septiembre: '09', octubre: '10', noviembre: '11', diciembre: '12'
    };
    const mes = meses[mesNombre];
    if (!mes) return '';
    return `2025-${mes}-${dia}`;
  };

  const handlePostClick = (evento) => {
    setSelectedPost(evento);
    setImage(evento.imagen);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Observa las secciones visibles y actualiza el fondo dinámicamente
  useEffect(() => {
    if (categoriaActiva !== 'todos') {
      document.body.setAttribute('data-categoria-visible', categoriaActiva);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) {
          const id = visible.target.getAttribute('data-categoria');
          document.body.setAttribute('data-categoria-visible', id);
        }
      },
      { threshold: 0.4 }
    );

    Object.values(seccionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [categoriaActiva, lugarFiltro, fechaFiltro]);

  return (
    <>
      <div className="container mt-4">
        <div className="row g-3 align-items-center mb-4">
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setCategoriaActiva(e.target.value)} value={categoriaActiva}>
              {categorias.map(cat => (
                <option key={cat.key} value={cat.key}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setLugarFiltro(e.target.value)} value={lugarFiltro}>
              <option value="">Todos los lugares</option>
              <option value="Bogotá">Bogotá</option>
              <option value="Medellín">Medellín</option>
              <option value="Cali">Cali</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Buscar evento..." />
              <button className="btn btn-primary">🔍</button>
            </div>
          </div>
        </div>

        {Object.entries(eventosData).map(([cat, eventos]) => {
          if (categoriaActiva !== 'todos' && categoriaActiva !== cat) return null;

          const eventosFiltrados = eventos.filter(e => {
            const fechaEvento = convertirFechaISO(e.fecha);
            return (
              (!lugarFiltro || e.lugar.includes(lugarFiltro)) &&
              (!fechaFiltro || fechaEvento === fechaFiltro)
            );
          });

          if (eventosFiltrados.length === 0) return null;

          return (
            <section
              key={cat}
              id={`categoria-${cat}`}
              className="mb-5 categoria-seccion"
              data-categoria={cat}
              ref={el => seccionRefs.current[cat] = el}
            >
              <h3 className="text-warning mb-3">{categorias.find(c => c.key === cat)?.label || cat}</h3>
              <div className="row g-4">
                {eventosFiltrados.map((e, i) => (
                  <div className="col-md-6 col-lg-4" key={i}>
                    <div className="card h-100 shadow-lg rounded-3">
                      <img
                        src={e.imagen}
                        className="card-img-top"
                        alt={e.titulo}
                        style={{ height: '250px', objectFit: 'cover', borderRadius: '10px' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-center text-uppercase">{e.titulo}</h5>
                        <p className="card-text text-center"><strong>{e.lugar}</strong></p>
                        <p className="card-text text-center">{e.fecha}</p>
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
        })}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image && (
            <img
              src={image}
              alt={selectedPost?.titulo}
              className="img-fluid mb-4"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}
          <p><strong>Lugar:</strong> {selectedPost?.lugar}</p>
          <p><strong>Fecha del evento:</strong> {selectedPost?.fecha}</p>
          <p>{selectedPost?.descripcion}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            <Link to="/comprar" state={{ evento: selectedPost }} style={{ textDecoration: 'none', color: 'white' }}>
              Comprar
            </Link>
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

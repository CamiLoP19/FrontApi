import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Card, Container, Row, Col, Alert } from 'react-bootstrap';

// Precios fijos por tipo de boleto
const PRECIOS_BOLETOS = {
  comun: 1000,
  preferencial: 2000,
  vip: 4000
};

export default function Comprar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [evento, setEvento] = useState(location.state?.evento || null);
  const [nombreComprador, setNombreComprador] = useState('');
  const [tipoBoleto, setTipoBoleto] = useState('comun');
  const [cantidad, setCantidad] = useState(1);

  const userId = parseInt(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  // Si no hay evento, intentar recuperarlo desde localStorage o fetch
  useEffect(() => {
    if (!evento) {
      const storedEvento = localStorage.getItem('eventoSeleccionado');
      if (storedEvento) {
        setEvento(JSON.parse(storedEvento));
      } else {
        const searchParams = new URLSearchParams(location.search);
        const eventoId = searchParams.get("eventoId");
        if (eventoId) {
          fetch(`https://localhost:7143/api/Eventoes/${eventoId}`)
            .then(res => res.json())
            .then(data => setEvento(data))
            .catch(() => setError("No se pudo cargar la información del evento"));
        }
      }
    } else {
      localStorage.setItem('eventoSeleccionado', JSON.stringify(evento));
    }
  }, [evento, location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const tipoBoletoBackend = {
        comun: 3,
        preferencial: 2,
        vip: 1
      }[tipoBoleto];

      const boletoData = {
        NombreComprador: nombreComprador || "Anónimo",
        TipoBoleto: tipoBoletoBackend,
        Descripcion: `Entrada para ${evento.nombreEvento} (${tipoBoleto})`,
        EstadoVenta: true,
        EventoId: evento.eventoId,
        PersonaId: userId
      };

      const response = await fetch('https://localhost:7143/api/Boletoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(boletoData)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Error al procesar la compra");
      }

      navigate('/compra-exitosa', {
        state: {
          boleto: await response.json(),
          precioTotal: PRECIOS_BOLETOS[tipoBoleto] * cantidad
        }
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!evento) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">No se encontró información del evento</Alert>
        <Button onClick={() => navigate('/')}>Volver al inicio</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Comprar entradas para: {evento.nombreEvento}</h2>

      <Card className="shadow">
        <Row className="g-0">
          <Col md={6}>
            <Card.Img
              src={evento.imagenUrl || evento.imagen || "https://placehold.co/600x400?text=Sin+Imagen"}
              alt={evento.nombreEvento}
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Col>

          <Col md={6}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del comprador</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombreComprador}
                    onChange={(e) => setNombreComprador(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tipo de entrada</Form.Label>
                  <Form.Select
                    value={tipoBoleto}
                    onChange={(e) => setTipoBoleto(e.target.value)}
                  >
                    <option value="comun">General (${PRECIOS_BOLETOS.comun})</option>
                    <option value="preferencial">Preferencial (${PRECIOS_BOLETOS.preferencial})</option>
                    <option value="vip">VIP (${PRECIOS_BOLETOS.vip})</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <h4>Total: ${PRECIOS_BOLETOS[tipoBoleto] * cantidad}</h4>
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : 'Confirmar Compra'}
                  </Button>
                </div>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

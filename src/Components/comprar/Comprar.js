import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, Card, Container } from 'react-bootstrap';

export default function Comprar() {
  const location = useLocation();
  const evento = location.state?.evento; // Recibimos los detalles del evento desde la navegación

  const [cantidad, setCantidad] = useState(1);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [metodoPago, setMetodoPago] = useState('');

  const handleCantidadChange = (e) => setCantidad(e.target.value);
  const handleFechaChange = (e) => setFechaSeleccionada(e.target.value);
  const handleMetodoPagoChange = (e) => setMetodoPago(e.target.value);

  const handleComprar = () => {
    alert('Compra realizada con éxito!');
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Compra de Entradas: {evento?.titulo}</h1>

      <Card className="mb-4 shadow-sm">
        <Card.Img variant="top" src={evento?.imagen} style={{ height: '250px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title className="text-center">{evento?.titulo}</Card.Title>
          <Card.Text><strong>Lugar:</strong> {evento?.lugar}</Card.Text>
          <Card.Text><strong>Fecha del Evento:</strong> {evento?.fecha}</Card.Text>
        </Card.Body>
      </Card>

      <Form>
        <div className="mb-3">
          <Form.Label><strong>Cantidad de entradas</strong></Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={cantidad}
            onChange={handleCantidadChange}
            className="shadow-sm"
          />
        </div>

        <div className="mb-3">
          <Form.Label><strong>Seleccionar fecha</strong></Form.Label>
          <Form.Control
            as="select"
            value={fechaSeleccionada}
            onChange={handleFechaChange}
            className="shadow-sm"
          >
            <option value="">Seleccione una fecha</option>
            <option value="12/06/2025">12 de junio, 8:00 PM</option>
            <option value="15/06/2025">15 de junio, 6:00 PM</option>
            <option value="20/06/2025">20 de junio, 5:00 PM</option>
            <option value="25/06/2025">25 de junio, 7:00 PM</option>
          </Form.Control>
        </div>

        <div className="mb-3">
          <Form.Label><strong>Seleccionar método de pago</strong></Form.Label>
          <Form.Control
            as="select"
            value={metodoPago}
            onChange={handleMetodoPagoChange}
            className="shadow-sm"
          >
            <option value="">Elija un método de pago</option>
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="efectivo">Pago en efectivo</option>
          </Form.Control>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <Button variant="secondary" onClick={() => window.history.back()} className="px-4 py-2">Volver a inicio</Button>
          <Button onClick={handleComprar} className="btn btn-success px-4 py-2">Comprar Entradas</Button>
        </div>
      </Form>
    </Container>
  );
}

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';

export default function Comprar() {
  const location = useLocation();
  const evento = location.state?.evento;
//intente esto en el navbar y no funciono
  const [cantidad, setCantidad] = useState(1);
  const [tipoBoleto, setTipoBoleto] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [errores, setErrores] = useState({});

  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol'); // Usa la misma clave que en login/navbar
  const isLoggedIn = !!token;
  const userRole = rol ? rol.toLowerCase() : null;


  // Precios por tipo de boleto
  const preciosBoleto = {
    comun: evento?.precio || 0,
    vip: (evento?.precio || 0) * 2, // VIP cuesta el doble
    preferencial: (evento?.precio || 0) * 1.5,
  };

  const handleCantidadChange = (e) => setCantidad(e.target.value);
  const handleTipoBoletoChange = (e) => setTipoBoleto(e.target.value);
  const handleMetodoPagoChange = (e) => setMetodoPago(e.target.value);

  const validarFormulario = () => {
    const newErrors = {};

    if (!cantidad || cantidad < 1 || !Number.isInteger(Number(cantidad))) {
      newErrors.cantidad = 'Debe ingresar una cantidad válida (número entero mayor o igual a 1).';
    }

    if (!tipoBoleto) {
      newErrors.tipoBoleto = 'Debe seleccionar un tipo de boleto.';
    }

    if (!metodoPago) {
      newErrors.metodoPago = 'Debe seleccionar un método de pago.';
    }

    setErrores(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleComprar = () => {
    if (!isLoggedIn) {
      alert('Debes iniciar sesión para poder comprar.');
      return;
    }

    if (userRole !== 'cliente') {
      alert('Solo los usuarios con rol "cliente" pueden realizar compras.');
      return;
    }

    if (!validarFormulario()) return;

    alert(
      `Compra realizada con éxito!\n
      Tipo de boleto: ${tipoBoleto}\n
      Cantidad: ${cantidad}\n
      Precio total: $${(preciosBoleto[tipoBoleto] * cantidad).toFixed(2)}`
    );
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Compra de Entradas: {evento?.titulo}</h1>

      <Card className="mb-4 shadow-sm">
        <Row className="g-0">
          <Col md={5}>
            <Card.Img
              src={evento?.imagen}
              alt={evento?.titulo}
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Col>

          <Col md={7}>
            <Card.Body>
              <Card.Title className="text-center">{evento?.titulo}</Card.Title>
              <Card.Text><strong>Lugar:</strong> {evento?.lugar}</Card.Text>
              <Card.Text>
                <strong>Precio base:</strong> ${evento?.precio?.toFixed(2) || 'N/A'}
              </Card.Text>

              <Form>
                <div className="mb-3">
                  <Form.Label><strong>Cantidad de entradas</strong></Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={handleCantidadChange}
                    className="shadow-sm"
                    isInvalid={!!errores.cantidad}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.cantidad}
                  </Form.Control.Feedback>
                </div>

                <div className="mb-3">
                  <Form.Label><strong>Tipo de boleto</strong></Form.Label>
                  <Form.Control
                    as="select"
                    value={tipoBoleto}
                    onChange={handleTipoBoletoChange}
                    className="shadow-sm"
                    isInvalid={!!errores.tipoBoleto}
                  >
                    <option value="">Seleccione tipo de boleto</option>
                    <option value="comun">Común</option>
                    <option value="vip">VIP</option>
                    <option value="preferencial">Preferencial</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errores.tipoBoleto}
                  </Form.Control.Feedback>
                </div>

                <div className="mb-3">
                  <Form.Label><strong>Seleccionar método de pago</strong></Form.Label>
                  <Form.Control
                    as="select"
                    value={metodoPago}
                    onChange={handleMetodoPagoChange}
                    className="shadow-sm"
                    isInvalid={!!errores.metodoPago}
                  >
                    <option value="">Elija un método de pago</option>
                    <option value="tarjeta">Tarjeta de crédito</option>
                    <option value="paypal">PayPal</option>
                    <option value="efectivo">Pago en efectivo</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errores.metodoPago}
                  </Form.Control.Feedback>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="secondary" onClick={() => window.history.back()} className="px-4 py-2">
                    Volver a inicio
                  </Button>
                  <Button onClick={handleComprar} className="btn btn-success px-4 py-2">
                    Comprar Entradas
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}



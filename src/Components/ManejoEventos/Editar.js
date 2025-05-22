import React, { useState } from "react";
import { Tabs, Tab, Card, Button, Row, Col, Container } from "react-bootstrap";
import eventos from "../mock/eventos.json";
import VistaPrevia from "./VistaPrevia";
import "./Editar.css";
const categorias = [
  { key: "Todos", label: "Todos" },
  { key: "Conciertos", label: "Concierto" },
  { key: "Cine", label: "Cine" },
  { key: "Deporte", label: "Deporte" },
  { key: "Teatro", label: "Teatro" },
  { key: "Otro", label: "Otro" },
];

export default function Editar() {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [nombreEvento, setNombreEvento] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  // Filtrado por nombre y categoría
  const eventosFiltrados = eventos.filter((item) => {
    const nombreCoincide = item.nombre
      .toLowerCase()
      .includes(nombreEvento.toLowerCase());
    const categoriaCoincide =
      categoriaSeleccionada === "Todos" ||
      item.categoria === categoriaSeleccionada;
    return nombreCoincide && categoriaCoincide;
  });

  return (
    <Container className="w-95 my-1">
      <Tabs
        id="categorias-tabs"
        activeKey={categoriaSeleccionada}
        onSelect={(k) => setCategoriaSeleccionada(k)}
        className="mb-3"
      >
        {categorias.map((cat) => (
          <Tab eventKey={cat.key} title={cat.label} key={cat.key} />
        ))}
      </Tabs>
      <div className="d-flex justify-content-start align-items-center mb-4">
        <label
          htmlFor="nombreEvento"
          className="me-2 fw-bold mb-0"
          style={{ fontSize: "1.1rem" }}
        >
          Buscar por nombre:
        </label>
        <input
          type="search"
          id="nombreEvento"
          className="form-control search-bar"
          placeholder="Ej: Rock, Cine, Feria..."
          style={{
            maxWidth: 300,
            borderRadius: "20px",
            boxShadow: "0 2px 8px #0001",
          }}
          onChange={(e) => setNombreEvento(e.target.value)}
          value={nombreEvento}
        />
      </div>
      <Row>
        <Col md={eventoSeleccionado ? 5 : 10} className="mb-4">
          <Row>
            {eventosFiltrados.map((event) => (
              <Col
                key={event.id}
                xs={12}
                md={6}
                lg={6}
                className="mb-2 aligh-items-stretch"
              >
                <Card
                  className={`h-100 shadow-sm ${
                    eventoSeleccionado && eventoSeleccionado.id === event.id
                      ? "border-primary border-3 selected-card"
                      : ""
                  }`}
                  style={{
                    transition: "box-shadow 0.2s, border 0.2s",
                  }}
                >
                  <Card.Img
                    className="img-fluid mx-auto d-block card-img-fixed"
                    variant="top"
                    src={event.imagen}
                  />
                  <Card.Body className="card-body-flex">
                    <Card.Title>{event.nombre}</Card.Title>
                    <Card.Title>{event.categoria}</Card.Title>
                    <Card.Text>
                      <strong>Ciudad</strong>: {event.ciudad}
                    </Card.Text>
                    <Card.Text>
                      <strong>Lugar</strong>: {event.lugar}
                      <Card.Text>
                        <strong>Fecha</strong>: {event.fecha}
                      </Card.Text>
                      <Card.Text>
                        <strong>Ciudad</strong>: {event.ciudad}
                      </Card.Text>
                      <Card.Text>
                        <strong>Hora</strong>: {event.hora}
                      </Card.Text>
                    </Card.Text>

                    <Card.Text>
                      <strong>Precio</strong>: ${event.precio}
                    </Card.Text>
                    <div className="card-actions-bottom">
                      <Button
                        variant="primary"
                        onClick={() => setEventoSeleccionado(event)}
                        disabled={
                          eventoSeleccionado &&
                          eventoSeleccionado.id === event.id
                        }
                      >
                        {eventoSeleccionado &&
                        eventoSeleccionado.id === event.id
                          ? "Editando"
                          : "Editar"}
                      </Button>
                      <Button variant="danger">Eliminar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        {eventoSeleccionado && (
          <Col
            md={7}
            className="d-flex justify-content-center align-items-start"
          >
            <VistaPrevia
              evento={eventoSeleccionado}
              onClose={() => setEventoSeleccionado(null)}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}

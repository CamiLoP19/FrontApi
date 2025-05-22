import React, { useRef, useEffect, useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import "./VistaPrevia.css";

export default function VistaPreviaFlotante({ evento, onClose }) {
  const fileInputRef = useRef();
  const containerRef = useRef();
  const [previewImg, setPreviewImg] = useState(evento?.imagen);

  // Cuando cambia el evento, actualiza la imagen de preview
  useEffect(() => {
    setPreviewImg(evento?.imagen);
  }, [evento]);

  // Hace que el modal siga el scroll del usuario (sin position: fixed) y esté a la derecha
  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const minTop = 32;
        const scrollTop = window.scrollY + 32;
        containerRef.current.style.position = "absolute";
        containerRef.current.style.top = `${Math.max(scrollTop, minTop)}px`;
        // Calcula el margen derecho (ajusta 32 si quieres más separación)
        const rightMargin = 32;
        containerRef.current.style.left = `${
          window.innerWidth - containerRef.current.offsetWidth - rightMargin
        }px`;
        containerRef.current.style.right = "auto";
        containerRef.current.style.margin = "0";
        containerRef.current.style.width = "500px"; // Ajusta el ancho si lo deseas
        containerRef.current.style.maxWidth = "98vw";
      }
    };
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    updatePosition();
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  // Maneja la selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Mostrar preview local
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewImg(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  if (!evento) return null;

  return (
    <div
      ref={containerRef}
      className="vista-previa-drawer show"
      style={{
        transition:
          "top 0.1s cubic-bezier(0.1,2,0.6,1), left 0s cubic-bezier(0.4,2,0.6,1), opacity 0.3s",
        width: "600px",
        maxWidth: "98vw",
      }}
    >
      <Card className="shadow-sm" style={{ width: "100%" }}>
        <Card.Body>
          <h1 className="mb-1 text-center">Editar Evento: {evento.nombre}</h1>
          <Row className="justify-content-center align-items-center">
            {/* Imagen centrada y clickable */}
            <Col md={5} className="d-flex justify-content-center  ">
              <div style={{ position: "relative", width: "100%" }}>
                <img
                  src={previewImg}
                  alt={evento.nombre}
                  className="vista-previa-img"
                  style={{ cursor: "pointer", width: "100%" }}
                  onClick={() => fileInputRef.current.click()}
                  title="Haz click para cambiar la imagen"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </Col>
            {/* Formulario centrado */}
            <Col md={7}>
              <Form className="text-center">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Nombre</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={evento.nombre}
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Descripcion</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Descripcion del evento"
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Ciudad</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={evento.ciudad}
                    className="shadow-sm"
                  />
                  <Form.Label>
                    <strong>Lugar</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={evento.lugar}
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <strong>Categoria</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={evento.categoria}
                      className="shadow-sm"
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Música">Música</option>
                      <option value="Cine">Cine</option>
                      <option value="Feria">Feria</option>
                      <option value="Teatro">Teatro</option>
                      {/* Agrega más opciones según tus categorías */}
                    </Form.Control>
                  </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Numero de boletas</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={evento.cantidadBoletas}
                    className="shadow-sm"
                  />{" "}
                  <Form.Label>
                    <strong>Precio</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={evento.precio}
                    className="shadow-sm"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Seleccionar fecha y hora</strong>
                  </Form.Label>
                  <Form.Control type="datetime-local" />
                </Form.Group>
                <div className="d-flex justify-content-between mt-4">
                  <Button variant="secondary" onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button className="btn btn-success ms-1">Guardar</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

import React, { useState } from 'react';
import Swal from 'sweetalert2';

const categorias = ['Concierto', 'Cine', 'Deporte', 'Teatro'];

export default function CrearEvento() {
  const [form, setForm] = useState({
    nombre: '',
    fecha: '',
    lugar: '',
    aforo: '',
    categoria: '',
    descripcion: '',
    imagenFile: null,
    estado: true
  });

  const [errores, setErrores] = useState({});
  const [imagenPreview, setImagenPreview] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setForm(prev => ({ ...prev, imagenFile: file }));
      setImagenPreview(URL.createObjectURL(file));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validar = () => {
    const err = {};
    if (!form.nombre) err.nombre = 'El nombre es obligatorio';
    if (!form.fecha) err.fecha = 'La fecha es obligatoria';
    if (!form.lugar) err.lugar = 'El lugar es obligatorio';
    if (!form.aforo || isNaN(form.aforo) || form.aforo <= 0) err.aforo = 'Aforo debe ser un número mayor a 0';
    if (!form.categoria) err.categoria = 'Selecciona una categoría';
    if (!form.descripcion) err.descripcion = 'La descripción es obligatoria';
    if (!form.imagenFile) err.imagenFile = 'La imagen es obligatoria';
    return err;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validar();
    setErrores(err);
    if (Object.keys(err).length > 0) {
      Swal.fire({ icon: 'error', title: 'Revisa los campos', text: 'Completa correctamente todos los campos.' });
      return;
    }

    // Guardar evento en localStorage (lista de eventos)
    const eventosGuardados = JSON.parse(localStorage.getItem("eventos")) || [];
    eventosGuardados.push({ ...form, imagenPreview });
    localStorage.setItem("eventos", JSON.stringify(eventosGuardados));

    Swal.fire({ icon: 'success', title: 'Evento creado', text: 'El evento se ha creado correctamente.' });

    setForm({
      nombre: '',
      fecha: '',
      lugar: '',
      aforo: '',
      categoria: '',
      descripcion: '',
      imagenFile: null,
      estado: true
    });
    setImagenPreview(null);
    setErrores({});
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4 shadow" style={{ maxWidth: 500, margin: '0 auto' }}>
        <h2 className="mb-4 text-center">Crear Evento</h2>

        <div className="mb-3">
          <label className="form-label">Nombre del evento</label>
          <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} />
          {errores.nombre && <span className="text-danger">{errores.nombre}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha del evento</label>
          <input type="date" className="form-control" name="fecha" value={form.fecha} onChange={handleChange} />
          {errores.fecha && <span className="text-danger">{errores.fecha}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Lugar del evento</label>
          <input type="text" className="form-control" name="lugar" value={form.lugar} onChange={handleChange} />
          {errores.lugar && <span className="text-danger">{errores.lugar}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Aforo</label>
          <input type="number" className="form-control" name="aforo" value={form.aforo} onChange={handleChange} min={1} />
          {errores.aforo && <span className="text-danger">{errores.aforo}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select className="form-select" name="categoria" value={form.categoria} onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errores.categoria && <span className="text-danger">{errores.categoria}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} />
          {errores.descripcion && <span className="text-danger">{errores.descripcion}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input type="file" className="form-control" name="imagenFile" accept="image/*" onChange={handleChange} />
          {errores.imagenFile && <span className="text-danger">{errores.imagenFile}</span>}
          {imagenPreview && <img src={imagenPreview} alt="Vista previa" className="img-fluid mt-2 rounded shadow" />}
        </div>

        <button type="submit" className="btn btn-primary w-100">Crear Evento</button>
      </form>
    </div>
  );
}

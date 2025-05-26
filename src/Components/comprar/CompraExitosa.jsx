import { useLocation } from 'react-router-dom';

export default function CompraExitosa() {
  const { state } = useLocation();
  
  return (
    <div className="text-center py-5">
      <h1>¡Compra exitosa!</h1>
      <p className="lead">Gracias por tu compra</p>
      
      <div className="mt-4 p-4 bg-light rounded">
        <h4>Resumen:</h4>
        <p>Total pagado: ${state?.precioTotal || 0}</p>
        <p>Código de boleto: {state?.boleto?.codigoAN || 'N/A'}</p>
      </div>
    </div>
  );
}
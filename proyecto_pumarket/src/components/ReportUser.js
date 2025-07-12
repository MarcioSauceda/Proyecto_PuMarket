import React, { useState } from 'react';
import './ReportUser.css';

const ReportUser = ({ reportedUser }) => {
  const [motivo, setMotivo] = useState('');
  const [detalles, setDetalles] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí iría el envío real al backend
    console.log(`Usuario reportado: ${reportedUser}`);
    console.log(`Motivo: ${motivo}`);
    console.log(`Detalles: ${detalles}`);

    setEnviado(true);
    setMotivo('');
    setDetalles('');
  };

  return (
    <div className="report-user-container">
      <h2>Reportar usuario: {reportedUser}</h2>
      {enviado ? (
        <p className="confirmacion">¡Reporte enviado al equipo!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Motivo del reporte:</label>
          <select value={motivo} onChange={(e) => setMotivo(e.target.value)} required>
            <option value="">Seleccione un motivo</option>
            <option value="spam">Envía spam</option>
            <option value="incumple">No cumple acuerdos</option>
            <option value="otro">Otro</option>
          </select>

          <label>Detalles adicionales:</label>
          <textarea
            placeholder="Describa el problema..."
            value={detalles}
            onChange={(e) => setDetalles(e.target.value)}
            required
          />

          <button type="submit">Enviar reporte</button>
        </form>
      )}
    </div>
  );
};

export default ReportUser;


import React from 'react';
import './AdminReports.css';

function AdminReports() {
  // Datos simulados por ahora
  const data = {
    totalUsuarios: 128,
    usuariosActivos: 87,
    productosPublicados: 320,
    productosVendidos: 198,
    reseñasTotales: 142,
  };

  return (
    <div className="admin-reportes-container">
      <h2>Reportes Generales</h2>

      <div className="reportes-grid">
        <div className="reporte-card">
          <h3>👥 Usuarios Registrados</h3>
          <p>{data.totalUsuarios}</p>
        </div>

        <div className="reporte-card">
          <h3>🟢 Usuarios Activos</h3>
          <p>{data.usuariosActivos}</p>
        </div>

        <div className="reporte-card">
          <h3>📦 Productos Publicados</h3>
          <p>{data.productosPublicados}</p>
        </div>

        <div className="reporte-card">
          <h3>✅ Productos Vendidos</h3>
          <p>{data.productosVendidos}</p>
        </div>

        <div className="reporte-card">
          <h3>⭐ Reseñas Totales</h3>
          <p>{data.reseñasTotales}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;
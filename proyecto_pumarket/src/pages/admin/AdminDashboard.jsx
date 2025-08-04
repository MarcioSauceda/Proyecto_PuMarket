// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminStatsCard from "../../components/admin/AdminStatsCard";
import { FaDollarSign, FaUsers, FaBox } from "react-icons/fa";

const AdminDashboard = () => {
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);

  useEffect(() => {
    // Total ventas
    fetch("http://localhost:8080/api/admin/reportes/total-ventas")
      .then((res) => res.json())
      .then(setTotalVentas);

    // Total usuarios
    fetch("http://localhost:8080/api/admin/usuarios/total")
      .then((res) => res.json())
      .then(setTotalUsuarios);

    // Total productos
    fetch("http://localhost:8080/api/admin/productos/total")
      .then((res) => res.json())
      .then(setTotalProductos);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />
      <div className="ml-64">
        <AdminHeader />
        <main className="p-6">
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <AdminStatsCard
              title="Total Ventas/Compras"
              value={`${totalVentas} Productos`}
              icon={<FaDollarSign className="text-primary text-3xl" />}
              bgColor="bg-primary bg-opacity-10"
            />
            <AdminStatsCard
              title="Total Usuarios Registrados"
              value={`${totalUsuarios} Usuarios`}
              icon={<FaUsers className="text-accent text-3xl" />}
              bgColor="bg-accent bg-opacity-10"
            />
            <AdminStatsCard
              title="Total Productos Disponibles"
              value={`${totalProductos} Productos`}
              icon={<FaBox className="text-primary text-3xl" />}
              bgColor="bg-primary bg-opacity-10"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

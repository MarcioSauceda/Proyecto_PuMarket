// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { FaBox, FaDollarSign, FaUsers } from "react-icons/fa";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminStatsCard from "../../components/admin/AdminStatsCard";

// Componente decorativo de bienvenida
const RoyalWelcome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl p-8 h-100 relative overflow-hidden shadow-2xl">
      {/* Círculos pulsantes de fondo */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border-2 border-white/20"
          style={{
            width: `${150 + i * 50}px`,
            height: `${150 + i * 50}px`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.5}s`,
            animation: 'ripple 4s infinite'
          }}
        />
      ))}

      {/* Estrellas decorativas */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white/30 animate-pulse"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            fontSize: `${Math.random() * 10 + 10}px`,
            animationDelay: `${Math.random() * 3}s`
          }}
        >
          ✨
        </div>
      ))}

      {/* Contenido central */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
        <div className="mb-6">
          <div className="text-2xl ml-4 animate-pulse mx-auto">
  <img 
    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIAfuKsBbfby-oIHWrER8S3Oh6-5SmOULVGZ2TLq8ADFyqqS1O5vxALfq1genm1YwZYmu_RJDOOBbxtrVpTb7Dz-KlsyIqO15Z1rE_CL2Sf1kIVBQobaSLk5J8NClNUSVUarACbM6qvas/s1600/logo-unah.png" 
    alt="Todos somos PUMA"
    className="w-96 h-auto rounded"
  />
</div>

          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Buenas, Administrador 👋
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Bienvenido al panel de control de Pu-Market
          </p>
          <div className="text-lg text-gray-400">
            {currentTime.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

         <div className="flex space-x-6 mt-8">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0s'}}>
            📊
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.2s'}}>
            👥
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.4s'}}>
            📦
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.6s'}}>
            💼
          </div>
        </div>
      </div>

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

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
              bgColor="mb-6 overflow-x-auto bg-white border shadow-sm rounded-xl border-greylight"
            />
            <AdminStatsCard
              title="Total Usuarios Registrados"
              value={`${totalUsuarios} Usuarios`}
              icon={<FaUsers className="text-accent text-3xl" />}
              bgColor="mb-6 overflow-x-auto bg-white border shadow-sm rounded-xl border-greylight"
            />
            <AdminStatsCard
              title="Total Productos Disponibles"
              value={`${totalProductos} Productos`}
              icon={<FaBox className="text-primary text-3xl" />}
              bgColor="mb-6 overflow-x-auto bg-white border shadow-sm rounded-xl border-greylight"
            />
          </div>

          {/* Elemento decorativo de bienvenida */}
          <div className="mb-8">
            <RoyalWelcome />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
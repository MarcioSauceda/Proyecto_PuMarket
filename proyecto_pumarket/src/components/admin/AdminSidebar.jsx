import React from "react";
import { ReactComponent as Logo } from "../../assets/logoPuma3.svg"; // Ajusta la ruta al SVG
import { Link } from "react-router-dom";
// Usamos react-icons para los íconos
import {
  FaTachometerAlt,
  FaUserFriends,
  FaChartLine,
  FaTags,
  FaCogs,
} from "react-icons/fa";

const navItems = [
  { to: "/admin", Icon: FaTachometerAlt, label: "Dashboard" },
  { to: "/admin/usuarios", Icon: FaUserFriends, label: "Usuarios" },
  { to: "/admin/reportes", Icon: FaChartLine, label: "Reportes" },
  { to: "/admin/categorias", Icon: FaTags, label: "Categorías" },
  { to: "/admin/opciones", Icon: FaCogs, label: "Opciones" },
];

const EnhancedAdminSidebar = () => (
  <div className="fixed inset-y-0 left-0 z-50 w-64 text-white shadow-xl bg-primary">
    <div className="flex items-center justify-center h-16">
      <span className="flex items-center text-2xl font-bold align-middle">
        <Logo className="inline-block w-16 h-16 mr-2" />
        Pu-Market
      </span>
    </div>
    <nav className="px-4 mt-8 space-y-4">
      {navItems.map(({ to, Icon, label }) => (
        <Link
          key={to}
          to={to}
          className="flex items-center p-3 transition-transform transform bg-white rounded-lg bg-opacity-10 hover:bg-opacity-20 hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center justify-center w-10 h-10 mr-3 text-white rounded-full bg-primary">
            <Icon className="w-5 h-5 text-yellow-500" />
          </div>
          <span className="text-base font-medium text-white">{label}</span>
        </Link>
      ))}
    </nav>
    <div className="absolute bottom-4 left-4 right-4">
      <div className="flex items-center p-4 space-x-3 bg-white rounded-lg shadow">
        <img
          src="https://cdn-icons-png.flaticon.com/512/17003/17003310.png"
          alt="Admin"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-textdark">Administrador</p>
          <p className="text-xs text-greylight">Panel de control</p>
        </div>
      </div>
    </div>
  </div>
);

export default EnhancedAdminSidebar;

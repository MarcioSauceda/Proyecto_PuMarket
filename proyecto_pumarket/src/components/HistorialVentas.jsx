import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HistorialVentas() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/ventas/vendedor/${user.id}`
        );
        if (res.ok) {
          setVentas(await res.json());
        } else {
          setVentas([]);
        }
      } catch (error) {
        setVentas([]);
      }
    };
    if (user?.id) fetchVentas();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Buscador por producto, comprador o precio
  const filteredVentas = ventas.filter(
    (venta) =>
      venta.producto?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.comprador?.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      venta.comprador?.apellido
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (venta.precioVenta + "").includes(searchTerm)
  );

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-primary text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-2xl font-semibold">Mi Perfil</span>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Buscar ventas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
            />
            <Link
              to="/dashboard"
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr"
            >
              Volver Dashboard
            </Link>
            <Link
              to="/messages"
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr"
            >
              Mensajería
            </Link>
            <button
              onClick={handleLogout}
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-6 flex-1">
        {/* Contenedor principal en fila: título + volver */}
        <div className="flex items-center justify-between mb-2 w-full">
          <h2 className="text-2xl font-bold text-textdark">
            Historial de Ventas
          </h2>
          <Link
            to="/profile"
            className="p-2 transition-shadow bg-primary border shadow-sm rounded-xl border-greylight hover:shadow-md text-white"
          >
            Volver Perfil
          </Link>
        </div>

        {/* Segunda fila: botones de historial */}
        <div className="flex justify-end space-x-4 mb-4">
          <Link
            to="/historialcompras"
            className="p-2 text-black border border-greylight rounded-xl shadow-sm transition-all duration-100 bg-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-yellow-400 hover:text-white hover:shadow-md font-semibold"
          >
            Historial Compras
          </Link>
          <Link
            to="/historialventas"
            className="p-2 text-black border border-greylight rounded-xl shadow-sm transition-all duration-100 bg-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-yellow-400 hover:text-white hover:shadow-md font-semibold"
          >
            Historial Ventas
          </Link>
        </div>

        {/* TABLA DE VENTAS */}
        {filteredVentas.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-textdark">Producto</th>
                  <th className="py-2 px-4 text-textdark">Comprador</th>
                  <th className="py-2 px-4 text-textdark">Precio</th>
                  <th className="py-2 px-4 text-textdark">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filteredVentas.map((venta) => (
                  <tr key={venta.idVenta} className="border-b">
                    <td className="py-2 px-4 text-black">
                      {venta.producto?.nombre}
                    </td>
                    <td className="py-2 px-4 text-black">
                      {venta.comprador?.nombre} {venta.comprador?.apellido}
                      <div className="text-xs text-gray-500">
                        {venta.comprador?.correoInstitucional}
                      </div>
                    </td>
                    <td className="py-2 px-4 text-black">
                      Lps. {venta.precioVenta}
                    </td>
                    <td className="py-2 px-4 text-black">
                      {new Date(venta.fechaVenta).toLocaleString("es-HN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-textdark">
            No tienes ventas registradas.
          </p>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-greylight py-4">
        <p className="text-center text-textdark text-sm">
          © {new Date().getFullYear()} Pu-Market | Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}

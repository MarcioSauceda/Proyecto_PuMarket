import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HistorialCompras() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [compras, setCompras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8080/api/ventas/comprador/${user.id}`
        );
        if (res.ok) {
          setCompras(await res.json());
        } else {
          setCompras([]);
        }
      } catch (error) {
        console.error("Error al cargar las compras:", error);
        setCompras([]);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) {
      fetchCompras();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredCompras = compras.filter(
    (venta) =>
      venta.producto?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.vendedor?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.vendedor?.apellido
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (venta.precioVenta + "").includes(searchTerm)
  );

  const handleViewSellerProfile = (correo) => {
    navigate(`/perfil-vendedor/${correo}`);
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* NAVBAR */}
      <nav className="bg-primary text-white px-4 py-3 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-2xl font-semibold">Mi Perfil</span>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Buscar compras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black transition-shadow"
            />
            <Link
              to="/dashboard"
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white font-bold text-center shadow-xs transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Volver Dashboard
            </Link>
            <Link
              to="/messages"
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white font-bold text-center shadow-xs transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Mensajería
            </Link>
            <button
              onClick={handleLogout}
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white font-bold text-center shadow-xs transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="flex items-center justify-between mb-2 w-full">
          <h2 className="text-3xl font-bold text-gray-800">
            Historial de Compras
          </h2>
          <Link
            to="/profile"
            className="p-2 transition-all bg-primary border shadow-sm rounded-xl border-gray-200 hover:shadow-md text-white font-semibold"
          >
            Volver Perfil
          </Link>
        </div>

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

        {/* TABLA DE COMPRAS */}
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-300">
          <table className="min-w-full bg-white table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/3 px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Producto
                </th>
                <th className="w-1/3 px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Vendedor
                </th>
                <th className="w-1/6 px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Precio
                </th>
                <th className="w-1/4 px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    Cargando historial de compras...
                  </td>
                </tr>
              ) : filteredCompras.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No tienes compras registradas.
                  </td>
                </tr>
              ) : (
                filteredCompras.map((venta, idx) => (
                  <tr
                    key={venta.idVenta}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-4 text-sm text-gray-800 truncate">
                      {venta.producto?.nombre || "-"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      <span
                        className="font-medium text-violet-600 hover:underline cursor-pointer"
                        onClick={() =>
                          handleViewSellerProfile(
                            venta.vendedor?.correoInstitucional
                          )
                        }
                      >
                        {venta.vendedor?.nombre} {venta.vendedor?.apellido}
                      </span>
                      <div className="text-xs text-gray-500">
                        {venta.vendedor?.correoInstitucional || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      L. {venta.precioVenta}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {new Date(venta.fechaVenta).toLocaleString("es-HN", {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Pu-Market | Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
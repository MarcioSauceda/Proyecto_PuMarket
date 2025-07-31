import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ReseñasPerfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("User:", user);
  // Cargar reseñas del vendedor logueado
  useEffect(() => {
    if (!user) return;
    // Aquí pones el console.log para ver el correo
    console.log("Correo buscado para reseñas:", user.correo);
    const fetchReseñas = async () => {
      try {
        // Aquí usamos el correo institucional porque tu backend lo pide así
        const response = await fetch(
          `http://localhost:8080/api/resenas/vendedor/${user.correo}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Reseñas recibidas del backend:", data);
          setReseñas(data);
        } else {
          setReseñas([]);
        }
      } catch (error) {
        setReseñas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReseñas();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Cargando usuario o reseñas
  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <span className="text-primary text-2xl font-bold">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-primary text-white px-4 py-3 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-2xl font-semibold">Mi Perfil</span>
          <div className="flex items-center space-x-3">
            <Link
              to="/profile"
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
            >
              Volver Perfil
            </Link>
            <Link
              to="/messages"
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
            >
              Mensajería
            </Link>
            <button
              onClick={handleLogout}
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <section className="px-4 py-12 md:py-24">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="font-black text-black text-center text-3xl leading-none uppercase max-w-2xl mx-auto mb-12">
              RESEÑAS RECIBIDAS
            </h2>
            {reseñas.length === 0 ? (
              <p className="text-center text-lg text-gray-700">
                Aún no tienes reseñas.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {reseñas.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white rounded-lg shadow p-8 flex flex-col items-center"
                    style={{ minWidth: 300 }}
                  >
                    <p className="font-bold uppercase text-blue-600 text-lg text-center mb-2">
                      {r.resenador?.nombre} {r.resenador?.apellido}
                    </p>
                    <p className="italic text-textdark text-xl text-center mb-4">
                      {r.comentario}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(r.fecha).toLocaleString("es-HN")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
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

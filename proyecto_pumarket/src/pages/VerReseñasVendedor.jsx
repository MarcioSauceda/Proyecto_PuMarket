import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function VerReseñasVendedor() {
  const { correo } = useParams();
  const navigate = useNavigate();
  const [reseñas, setReseñas] = useState([]);
  const [vendedor, setVendedor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos del vendedor y reseñas
  useEffect(() => {
    if (!correo) return;

    // Traer info del vendedor
    fetch(`http://localhost:8080/api/usuarios/correo/${correo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setVendedor(data))
      .catch(() => setVendedor(null));

    // Traer reseñas del vendedor por correo
    fetch(`http://localhost:8080/api/resenas/vendedor/${correo}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setReseñas(data))
      .catch(() => setReseñas([]))
      .finally(() => setLoading(false));
  }, [correo]);

  if (loading) {
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
          <span className="text-2xl font-semibold">
            Reseñas de {vendedor?.nombre} {vendedor?.apellido}
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Volver
            </button>
            <Link
              to="/dashboard"
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Dashboard
            </Link>
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
                Aún no tiene reseñas.
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

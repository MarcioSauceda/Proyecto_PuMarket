import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DejarResena() {
  const { correo } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [vendedor, setVendedor] = useState(null);

  // Obtener el nombre y el id del vendedor
  useEffect(() => {
    const fetchVendedor = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/usuarios/correo/${correo}`
        );
        if (res.ok) {
          const data = await res.json();
          setVendedor(data);
        }
      } catch (error) {
        setVendedor(null);
      }
    };
    fetchVendedor();
  }, [correo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario.trim()) {
      setMensaje("¡La reseña no puede estar vacía!");
      return;
    }
    setLoading(true);
    setMensaje("");
    // Envía los objetos con id
    const payload = {
      comentario,
      vendedor: { id: vendedor.id },
      resenador: { id: user.id },
    };

    try {
      const res = await fetch("http://localhost:8080/api/resenas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMensaje("¡Reseña enviada exitosamente!");
        setComentario("");
        setTimeout(() => {
          navigate(`/perfil-vendedor/${correo}`);
        }, 1500);
      } else {
        setMensaje("Error al enviar la reseña. Intenta de nuevo.");
      }
    } catch {
      setMensaje("No se pudo conectar al servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading si no se ha cargado el vendedor
  if (!vendedor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-primary text-xl font-bold">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-primary text-white px-4 py-3 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-2xl font-semibold">Dejar una reseña</span>
          <Link
            to={`/perfil-vendedor/${correo}`}
            className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
          >
            Volver al Perfil
          </Link>
        </div>
      </nav>

      <main className="container mx-auto flex-1 flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mt-12">
          <h2 className="text-2xl font-bold mb-6 text-primary text-center">
            Escribe tu reseña para{" "}
            <span className="text-blue-800 font-bold">
              {vendedor.nombre} {vendedor.apellido}
            </span>
          </h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-32 p-4 border border-greylight rounded-lg mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-primary text-textdark bg-gray-100"
              placeholder={`Escribe la reseña para `}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              disabled={loading}
            />
            {mensaje && (
              <div
                className={`mb-4 text-center font-semibold ${
                  mensaje.includes("exitosamente")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {mensaje}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:opacity-90 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Enviando..." : "Enviar Reseña"}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-white border-t border-greylight py-4 mt-8">
        <p className="text-center text-textdark text-sm">
          © {new Date().getFullYear()} Pu-Market | Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ChatConversacion() {
  const { emailVendedor } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productoId = params.get("productoId");
  const compradorId = params.get("compradorId");
  const { user } = useAuth();

  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [conversacionId, setConversacionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [peticionEnviada, setPeticionEnviada] = useState(false);

  // Detectar rol real según la URL (ahora se puede abrir como comprador o vendedor)
  useEffect(() => {
    if (!compradorId || !emailVendedor || !productoId || peticionEnviada)
      return;
    setError(null);

    const crearOBuscarConversacion = async () => {
      setPeticionEnviada(true);

      // Siempre usa el compradorId que viene por URL y el vendedor por params
      const body = {
        compradorId: Number(compradorId),
        vendedorEmail: emailVendedor,
        productoId: Number(productoId),
      };

      try {
        const res = await fetch(
          "http://localhost:8080/api/conversaciones/crear-o-buscar",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        if (res.ok) {
          const data = await res.json();
          setConversacionId(data.id);
        } else {
          const errorJson = await res.json();
          setError(
            errorJson.message ||
              "Error buscando o creando la conversación (¿Ya existe?)"
          );
        }
      } catch (e) {
        setError("Error conectando con el servidor.");
        setPeticionEnviada(false);
      }
    };

    crearOBuscarConversacion();
  }, [compradorId, emailVendedor, productoId, peticionEnviada]);

  // Traer mensajes
  useEffect(() => {
    if (!conversacionId) return;
    setLoading(true);
    setError(null);

    const traerMensajes = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/mensajes/conversacion/${conversacionId}`
        );
        if (!res.ok) {
          setError("No se pudieron cargar los mensajes.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setMensajes(data);
        setLoading(false);
      } catch (e) {
        setError("Error de conexión al servidor.");
        setLoading(false);
      }
    };
    traerMensajes();
  }, [conversacionId]);

  // Enviar mensaje
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);

    const mensaje = {
      conversacion: { id: conversacionId },
      emisor: { id: user.id },
      contenido: input,
    };
    try {
      const res = await fetch("http://localhost:8080/api/mensajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mensaje),
      });
      if (res.ok) {
        setInput("");
        // Traer los mensajes de nuevo
        const updated = await fetch(
          `http://localhost:8080/api/mensajes/conversacion/${conversacionId}`
        );
        setMensajes(await updated.json());
      } else {
        setError("Error al enviar el mensaje.");
      }
    } catch (e) {
      setError("Error de conexión al enviar el mensaje.");
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <span className="text-primary text-2xl font-bold">
          Cargando chat...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Encabezado */}
      {/* Navbar fijo */}
<div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white p-4 flex items-center justify-between">
  <span className="font-semibold">Conversación con {emailVendedor}</span>
  <button
    className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
    onClick={() => window.history.back()}
  >
    Volver
  </button>
</div>

{/* Contenido debajo del navbar con espacio para que no se oculte */}
<div className="pt-20">
</div>

      {/* Error */}
      {error && (
        <div className="text-red-600 text-center py-2 font-semibold bg-red-100 pt-16">
          {error}
        </div>
      )}

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {mensajes.length === 0 ? (
          <div className="text-center text-gray-500">No hay mensajes aún.</div>
        ) : (
          mensajes.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xl mx-auto my-2 p-3 rounded-lg shadow ${
                msg.emisor?.id === user.id
                  ? "bg-blue-100 text-right ml-auto"
                  : "bg-gray-200 text-left mr-auto"
              }`}
            >
              <div className="text-sm font-semibold text-primary text-black">
                {msg.emisor?.nombre}
              </div>
              <div className="text-black">{msg.contenido}</div>
              <div className="text-xs text-gray-500">
                {new Date(msg.fechaEnvio).toLocaleString("es-HN")}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Formulario enviar mensaje */}
      <form
        onSubmit={handleSend}
        className="flex items-center p-4 bg-white border-t"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 px-4 py-2 border rounded mr-2 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MisConversaciones() {
  const { user } = useAuth();
  const [conversaciones, setConversaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate();
  const mainRef = useRef();

  useEffect(() => {
    const fetchConversaciones = async () => {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8080/api/conversaciones/usuario/${user.id}`
      );
      const data = await res.json();
      setConversaciones(data);
      setLoading(false);
    };
    if (user?.id) fetchConversaciones();
  }, [user]);

  // Filtrado de chats mejorado
  const filtered = conversaciones.filter((conv) => {
    const otro = conv.comprador.id === user.id ? conv.vendedor : conv.comprador;
    const searchTerm = search.toLowerCase().trim();
    
    // Si no hay término de búsqueda, mostrar todo
    if (!searchTerm) return true;
    
    // Búsqueda individual en cada campo del usuario
    const nombreMatch = otro.nombre.toLowerCase().includes(searchTerm);
    const apellidoMatch = otro.apellido.toLowerCase().includes(searchTerm);
    const correoMatch = otro.correoInstitucional.toLowerCase().includes(searchTerm);
    
    // Búsqueda en nombre completo (nombre + apellido)
    const nombreCompleto = `${otro.nombre} ${otro.apellido}`.toLowerCase();
    const nombreCompletoMatch = nombreCompleto.includes(searchTerm);
    
    // También búsqueda en apellido + nombre (por si alguien busca así)
    const apellidoNombre = `${otro.apellido} ${otro.nombre}`.toLowerCase();
    const apellidoNombreMatch = apellidoNombre.includes(searchTerm);
    
    // Búsqueda en el producto
    let productoMatch = false;
    if (conv.producto) {
      const productoNombre = conv.producto.nombre.toLowerCase();
      const productoDescripcion = conv.producto.descripcion ? conv.producto.descripcion.toLowerCase() : "";
      productoMatch = productoNombre.includes(searchTerm) || productoDescripcion.includes(searchTerm);
    }
    
    return nombreMatch || apellidoMatch || correoMatch || nombreCompletoMatch || apellidoNombreMatch || productoMatch;
  });

  return (
    <div className="flex h-screen bg-primary bg-opacity-5">
      {/* SIDEBAR CHATS */}
      <aside className="w-80 bg-white border-r border-greylight flex flex-col">
        <header className="flex items-center justify-between p-4 bg-primary text-white rounded-t-lg">
          <h2 className="text-lg font-semibold">Mensajería</h2>
          <Link
              to="/profile"
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
            >
              Volver Perfil
            </Link>
        </header>
        {/* Buscador */}
        <div className="p-3 border-b border-greylight">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type="text"
              placeholder="Buscar por nombre, apellido, correo o producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-greylight rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto divide-y divide-greylight">
          {loading ? (
            <li className="p-4 text-center text-primary">
              Cargando conversaciones...
            </li>
          ) : filtered.length === 0 ? (
            <li className="p-4 text-gray-400 text-center">
              {search ? "No se encontraron conversaciones" : "No tienes conversaciones"}
            </li>
          ) : (
            filtered.map((conv) => {
              const otro =
                conv.comprador.id === user.id ? conv.vendedor : conv.comprador;
              return (
                <li
                  key={conv.id}
                  onClick={() => setActiveChat(conv)}
                  className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-blue-50 transition-all
                  ${activeChat?.id === conv.id ? "bg-blue-100" : ""}
                  `}
                >
                  {/* Avatar */}
                  <img
                    src={
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(otro.nombre + " " + otro.apellido)
                    }
                    alt={otro.nombre}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-primary">
                      {otro.nombre} {otro.apellido}
                    </div>
                    <div className="text-xs text-gray-600">
                      {otro.correoInstitucional}
                    </div>
                    {conv.producto && (
                      <div className="text-xs text-gray-500 italic">
                        Producto: {conv.producto.nombre}
                      </div>
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </aside>

      {/* MAIN CHAT AREA */}
      <main
        ref={mainRef}
        className="flex-1 flex flex-col justify-center items-center bg-primary bg-opacity-5"
      >
        {!activeChat ? (
          <div className="flex flex-col items-center justify-center h-full text-primary">
            <FaArrowLeft className="mb-2 text-4xl" />
            <p className="text-xl font-bold">
              Selecciona una conversación para comenzar
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xl font-semibold mb-2 text-primary">
              Conversación seleccionada
            </p>
            <button
              className="px-4 py-2 bg-primary text-white rounded mt-2"
              onClick={() => {
                // Asegúrate de pasar compradorId también
                const correoVendedor = activeChat.vendedor.correoInstitucional;
                const compradorId = activeChat.comprador.id;
                navigate(
                  `/messages/${correoVendedor}?productoId=${activeChat.producto.id}&compradorId=${compradorId}`
                );
              }}
            >
              Ir al chat
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
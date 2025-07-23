import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaArrowLeft,
  FaVideo,
  FaPhone,
  FaInfoCircle,
  FaPaperPlane,
  FaSmile,
} from "react-icons/fa";

// Datos de ejemplo; reemplazar por datos reales o API
const sampleChats = [
  {
    id: 1,
    name: "jessica_smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    time: "2h",
    preview: "¡Hola! ¿Cómo estás?",
    unread: 0,
  },
  {
    id: 2,
    name: "mike_johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "5h",
    preview: "¿Nos reunimos mañana?",
    unread: 3,
  },
  {
    id: 3,
    name: "sarah_williams",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    time: "1d",
    preview: "¡Gracias por la foto!",
    unread: 0,
  },
];

export default function Messages() {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Desplazarse al final cuando cambian los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChatId]);

  // Manejar selección de chat en la barra lateral
  const selectChat = (chat) => {
    setActiveChatId(chat.id);
    if (window.innerWidth <= 768) setSidebarActive(false);
    if (!messages[chat.id]) {
      setMessages((prev) => ({
        ...prev,
        [chat.id]: [{ sent: false, content: chat.preview, time: chat.time }],
      }));
    }
  };

  // Enviar mensaje y simular respuesta
  const handleSend = () => {
    if (!input.trim() || activeChatId == null) return;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [
        ...prev[activeChatId],
        { sent: true, content: input, time },
      ],
    }));
    setInput("");
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [activeChatId]: [
          ...prev[activeChatId],
          {
            sent: false,
            content: "¡Entendido!",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      }));
    }, 1500);
  };

  const activeChat = sampleChats.find((c) => c.id === activeChatId);

  return (
    <div className="flex h-screen">
      {/* Barra lateral con lista de chats */}
      {sidebarActive && (
        <aside className="w-80 bg-primary bg-opacity-5 border-r border-greylight flex flex-col">
          {/* Encabezado de la barra lateral */}
          <header className="flex items-center justify-between p-4 bg-primary text-white">
            <h2 className="text-lg font-semibold">Mensajes</h2>
            <Link
              to="/profile"
              className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
              aria-label="Ir al perfil"
            >
              Perfil
            </Link>
          </header>

          {/* Buscador de chats */}
          <div className="p-3 border-b border-greylight">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-textdark" />
              <input
                type="text"
                placeholder="Buscar chats..."
                aria-label="Buscar chats"
                className="w-full pl-10 pr-3 py-2 border border-greylight rounded-lg bg-white text-textdark focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Lista de chats con líneas suaves */}
          <ul className="flex-1 overflow-y-auto divide-y divide-greylight">
            {sampleChats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => selectChat(chat)}
                role="button"
                className={
                  `flex items-center p-3 cursor-pointer hover:bg-primary hover:bg-opacity-10 ` +
                  (chat.id === activeChatId ? "bg-primary bg-opacity-10" : "")
                }
              >
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary mr-3"
                />
                <div className="flex-1">
                  <div className="flex justify-between text-textdark font-medium">
                    <span>{chat.name}</span>
                    <span className="text-xs text-textdark">{chat.time}</span>
                  </div>
                  <div className="text-sm text-textdark truncate">
                    {chat.preview}
                  </div>
                </div>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {chat.unread}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Área de conversación principal */}
      {activeChat ? (
        <main className="flex-1 flex flex-col bg-primary bg-opacity-5">
          {/* Encabezado del chat */}
          <header className="flex items-center justify-between p-4 border-b border-greylight bg-primary bg-opacity-10">
            {/* Botón para volver en móvil */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarActive(true)}
                className="mr-4 text-textdark md:hidden"
                aria-label="Volver a chats"
              >
                <FaArrowLeft />
              </button>
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-primary mr-3"
              />
              <h3 className="text-textdark font-medium">{activeChat.name}</h3>
            </div>
            {/* Íconos de llamada e información */}
            <div className="flex space-x-4 text-primary">
              <FaVideo
                className="cursor-pointer"
                aria-label="Llamada de video"
              />
              <FaPhone className="cursor-pointer" aria-label="Llamada de voz" />
              <FaInfoCircle
                className="cursor-pointer"
                aria-label="Ver información"
              />
            </div>
          </header>

          {/* Mensajes con scroll automático */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            {(messages[activeChatId] || []).map((msg, idx) => (
              <div
                key={idx}
                className={`flex mb-4 ${
                  msg.sent ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg relative ${
                    msg.sent
                      ? "bg-primary text-white rounded-tr-sm"
                      : "bg-primary bg-opacity-10 text-textdark rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                  <div
                    className={`text-xs mt-1 ${
                      msg.sent ? "text-white/70" : "text-textdark"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de envío de mensajes */}
          <div className="flex items-center p-4 border-t border-greylight bg-white">
            <FaSmile
              className="text-primary text-xl mr-4 cursor-pointer"
              aria-label="Emoticonos"
            />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              aria-label="Escribe tu mensaje"
              rows={1}
              className="flex-1 px-4 py-2 border border-primary rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-primary text-textdark"
            />
            <button
              onClick={handleSend}
              className="text-primary text-2xl ml-4 hover:text-primary-dark"
              aria-label="Enviar mensaje"
            >
              <FaPaperPlane />
            </button>
          </div>
        </main>
      ) : (
        // Mensaje inicial cuando no hay chat seleccionado
        <div className="flex-1 flex items-center justify-center text-textdark">
          Selecciona un chat para comenzar
        </div>
      )}
    </div>
  );
}

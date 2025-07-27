import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ReseñasPerfilVendedor() {
const { user, logout } = useAuth();
const navigate = useNavigate();
const handleLogout = () => {
    logout();
    navigate("/");
};

if (!user) {
    navigate("/");
    return null;
}

return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-primary text-white px-4 py-3 sticky top-0 z-50">
  <div className="container mx-auto flex items-center justify-between">
    <span className="text-xl font-semibold">Perfil de{" "}
            {user.nombre} {user.apellido}

          </span>
    <div className="flex items-center space-x-3">
      <Link
        to="/profilevendedor"
        className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
      >
        Volver Perfil
      </Link>
      <Link
        to="/messages"
        className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
      >
        Mensajería
      </Link>
      <button
        onClick={handleLogout}
        className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
      >
        Cerrar Sesión
      </button>
    </div>
  </div>
</nav>


      {/* CONTENIDO PRINCIPAL */}
<main className="container mx-auto px-4 py-6 flex-1">
  <div className="mb-4">
  <section className="px-4 py-12 md:py-24">
    <div className="max-w-screen-xl mx-auto">
      <h2 className="font-black text-black text-center text-3xl leading-none uppercase max-w-2xl mx-auto mb-12">
        Reseñas
      </h2>

      {/* Cambiado de flex a grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-200 rounded-lg p-8 text-center">
          <p className="font-bold uppercase">John Doe</p>
          <p className="text-xl font-light italic text-gray-700">
            This podcast is amazing! The storytelling and production quality are top-notch. I can't wait for the next episode!
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-8 text-center">
          <p className="font-bold uppercase">Jane Smith</p>
          <p className="text-xl font-light italic text-gray-700">
            This podcast kept me on the edge of my seat. It's a must-listen for true crime enthusiasts!
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-8 text-center">
          <p className="font-bold uppercase">Emily Johnson</p>
          <p className="text-xl font-light italic text-gray-700">
            I can't get enough of this podcast! The host's voice is so soothing, and the stories are gripping. Highly recommend!
          </p>
        </div>
        {/* Más reseñas se ajustarán automáticamente en nuevas filas */}
        <div className="bg-gray-200 rounded-lg p-8 text-center">
          <p className="font-bold uppercase">Carlos Pérez</p>
          <p className="text-xl font-light italic text-gray-700">
            Una experiencia increíble. Producción excelente y muy atrapante.
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-8 text-center">
          <p className="font-bold uppercase">Ana Ruiz</p>
          <p className="text-xl font-light italic text-gray-700">
            Escuchar este podcast se ha vuelto parte de mi rutina diaria. ¡Me encanta!
            csjbcksbscds
            ekdbcjehcecjbedcjedc
            coencbeibce
            xiduwbi
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-8 text-center">
          <p className="font-bold uppercase">Ana Ruiz</p>
          <p className="text-xl font-light italic text-gray-700">
            Escuchar este podcast se ha vuelto parte de mi rutina diaria. ¡Me encanta!
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-8 text-center">
          <p className="font-bold uppercase">Ana Ruiz</p>
          <p className="text-xl font-light italic text-gray-700">
            Escuchar este podcast se ha vuelto parte de mi rutina diaria. ¡Me encanta!
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-8 text-center">
          <p className="font-bold uppercase">Ana Ruiz</p>
          <p className="text-xl font-light italic text-gray-700">
            Escuchar este podcast se ha vuelto parte de mi rutina diaria. ¡Me encanta!
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
</main>

{/* FOOTER */}
<footer className="bg-white border-t border-greylight py-4">
<p className="text-center text-textdark text-sm">
© {new Date().getFullYear()} Pu-Market | Todos los derechos reservados
</p>
</footer>
{/* MODALES */}
</div>
);
}

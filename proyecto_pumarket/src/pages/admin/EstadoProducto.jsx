import { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaCheckSquare } from "react-icons/fa"; // Usamos un ícono diferente

const EstadoProductoPage = () => {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editandoNombre, setEditandoNombre] = useState("");
  const [error, setError] = useState("");

  // Traer estados al cargar
  useEffect(() => {
    traerEstados();
  }, []);

  const traerEstados = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/admin/estados-producto")
      .then((res) => res.json())
      .then((data) => setEstados(data))
      .finally(() => setLoading(false));
  };

  // Crear nuevo estado
  const crearEstado = async (e) => {
    e.preventDefault();
    setError("");
    if (!nuevoEstado.trim()) return;
    const res = await fetch(
      "http://localhost:8080/api/admin/estados-producto",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoEstado }),
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      setError(msg);
      return;
    }
    setNuevoEstado("");
    traerEstados();
  };

  // Eliminar estado
  const eliminarEstado = async (id) => {
    if (!window.confirm("¿Eliminar este estado?")) return;
    const res = await fetch(
      `http://localhost:8080/api/admin/estados-producto/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      setError(msg);
      return;
    }
    traerEstados();
  };

  // Iniciar edición
  const iniciarEdicion = (estado) => {
    setEditandoId(estado.id);
    setEditandoNombre(estado.nombre);
    setError("");
  };

  // Guardar edición
  const guardarEdicion = async (id) => {
    setError("");
    if (!editandoNombre.trim()) return;
    const res = await fetch(
      `http://localhost:8080/api/admin/estados-producto/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: editandoNombre }),
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      setError(msg);
      return;
    }
    setEditandoId(null);
    setEditandoNombre("");
    traerEstados();
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="min-h-screen p-6 bg-slate-100">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 transition-shadow bg-white border shadow-sm rounded-xl border-greylight hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-greylight">
                    Total Estados de Producto
                  </p>
                  <p className="mt-2 text-3xl font-bold text-textdark">
                    {estados.length} Estados
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent bg-opacity-20">
                  <FaCheckSquare className="text-accent text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Formulario agregar */}
          <div className="bg-white rounded-xl shadow-sm border border-greylight p-6 mb-6 w-full lg:w-[350px]">
            <form className="flex mb-4" onSubmit={crearEstado}>
              <input
                type="text"
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-l"
                placeholder="Nuevo estado de producto"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-white font-semibold rounded-r"
              >
                Crear
              </button>
            </form>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <h3 className="mb-4 text-lg font-semibold text-textdark">
              Estados de Producto Disponibles
            </h3>
            {loading ? (
              <div>Cargando...</div>
            ) : (
              <ul className="space-y-3">
                {estados.map((estado) => (
                  <li
                    key={estado.id}
                    className="flex items-center justify-between"
                  >
                    {editandoId === estado.id ? (
                      <>
                        <input
                          type="text"
                          value={editandoNombre}
                          onChange={(e) => setEditandoNombre(e.target.value)}
                          className="flex-1 px-2 py-1 border rounded"
                        />
                        <button
                          onClick={() => guardarEdicion(estado.id)}
                          className="ml-2 px-2 py-1 text-white bg-primary rounded"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditandoId(null)}
                          className="ml-2 px-2 py-1 text-white bg-gray-400 rounded"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-textdark">{estado.nombre}</span>
                        <div className="space-x-2">
                          <button
                            onClick={() => iniciarEdicion(estado)}
                            className="text-primary hover:underline"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarEstado(estado.id)}
                            className="text-error hover:underline"
                          >
                            Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EstadoProductoPage;

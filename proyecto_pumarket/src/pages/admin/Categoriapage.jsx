import { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
const CategoriaPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editandoNombre, setEditandoNombre] = useState("");
  const [error, setError] = useState("");

  // Traer categorías al cargar
  useEffect(() => {
    traerCategorias();
  }, []);

  const traerCategorias = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/admin/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .finally(() => setLoading(false));
  };

  // Crear nueva categoría
  const crearCategoria = async (e) => {
    e.preventDefault();
    setError("");
    if (!nuevaCategoria.trim()) return;
    const res = await fetch("http://localhost:8080/api/admin/categorias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevaCategoria }),
    });
    if (!res.ok) {
      const msg = await res.text();
      setError(msg);
      return;
    }
    setNuevaCategoria("");
    traerCategorias();
  };

  // Eliminar categoría
  const eliminarCategoria = async (id) => {
    if (!window.confirm("¿Eliminar esta categoría?")) return;
    const res = await fetch(
      `http://localhost:8080/api/admin/categorias/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      setError(msg);
      return;
    }
    traerCategorias();
  };

  // Iniciar edición
  const iniciarEdicion = (categoria) => {
    setEditandoId(categoria.id);
    setEditandoNombre(categoria.nombre);
    setError("");
  };

  // Guardar edición
  const guardarEdicion = async (id) => {
    setError("");
    if (!editandoNombre.trim()) return;
    const res = await fetch(
      `http://localhost:8080/api/admin/categorias/${id}`,
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
    traerCategorias();
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
                    Total Categorías
                  </p>
                  <p className="mt-2 text-3xl font-bold text-textdark">
                    {categorias.length} Categorías
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent bg-opacity-20">
                  <FaBox className="text-accent text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Formulario agregar */}
          <div className="bg-white rounded-xl shadow-sm border border-greylight p-6 mb-6 w-full lg:w-[350px]">
            <form className="flex mb-4" onSubmit={crearCategoria}>
              <input
                type="text"
                value={nuevaCategoria}
                onChange={(e) => setNuevaCategoria(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-l"
                placeholder="Nueva categoría"
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
              Categorías Disponibles
            </h3>
            {loading ? (
              <div>Cargando...</div>
            ) : (
              <ul className="space-y-3">
                {categorias.map((cat) => (
                  <li
                    key={cat.id}
                    className="flex items-center justify-between"
                  >
                    {editandoId === cat.id ? (
                      <>
                        <input
                          type="text"
                          value={editandoNombre}
                          onChange={(e) => setEditandoNombre(e.target.value)}
                          className="flex-1 px-2 py-1 border rounded"
                        />
                        <button
                          onClick={() => guardarEdicion(cat.id)}
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
                        <span className="text-textdark">{cat.nombre}</span>
                        <div className="space-x-2">
                          <button
                            onClick={() => iniciarEdicion(cat)}
                            className="text-primary hover:underline"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarCategoria(cat.id)}
                            className="text-red-600 hover:underline"

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

export default CategoriaPage;

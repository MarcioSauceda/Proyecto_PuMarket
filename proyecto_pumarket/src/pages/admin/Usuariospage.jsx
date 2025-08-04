import { useEffect, useState } from "react";
import { FaTrash, FaUserFriends } from "react-icons/fa";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

const UsuariosPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar estudiantes al montar el componente
  useEffect(() => {
    fetch("http://localhost:8080/api/admin/estudiantes")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Función para eliminar usuario estudiante
  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/estudiantes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
      } else {
        const errorMsg = await res.text();
        alert(errorMsg);
      }
    } catch (error) {
      alert("Error eliminando usuario");
    }
  };

  return (
    <div className="flex ">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-slate-100">
        <AdminHeader />
        <main className="min-h-screen p-6 bg-slate-100">
          {/* Stats Card */}
          <div className="w-full p-6 mb-6 bg-white border shadow-sm rounded-xl border-greylight hover:shadow-md md:w-64">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-greylight">
                  Total Usuarios Registrados
                </p>
                <p className="mt-1 text-2xl font-bold text-textdark">
                  {users.length} <span className="font-semibold">Usuarios</span>
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 mt-1 ml-2 rounded-md bg-accent bg-opacity-20">
                <FaUserFriends className="text-lg text-accent" />
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="mb-6 overflow-x-auto bg-white border shadow-sm rounded-xl border-greylight">
            <div className="px-6 py-4 border-b border-softgray">
              <h3 className="text-lg font-semibold text-textdark">
                Usuarios registrados en Pu-Market
              </h3>
            </div>
            <table className="w-full">
              <thead className="bg-softgray">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-greylight">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-greylight">
                    Compras
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-greylight">
                    Ventas
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-greylight">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-softgray">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-greylight">
                      Cargando usuarios...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-greylight">
                      No hay estudiantes registrados.
                    </td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={user.id || idx} className="hover:bg-softgray">
                      <td className="flex items-center px-6 py-4 whitespace-nowrap">
                        <img
                          src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                          alt={user.nombre}
                          className="w-8 h-8 mr-3 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-textdark">
                            {user.nombre} {user.apellido}
                          </div>
                          <div className="text-sm text-greylight">
                            {user.correoInstitucional}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-textdark">
                        {user.compras + " Productos"}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-textdark">
                        {user.ventas + " Productos"}
                      </td>
                      <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                        <div className="flex justify-center space-x-4">
                          <button
                            className="text-error hover:text-error/80"
                            onClick={() => eliminarUsuario(user.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UsuariosPage;

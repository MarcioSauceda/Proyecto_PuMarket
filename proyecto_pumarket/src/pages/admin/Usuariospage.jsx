import { FaEdit, FaEye, FaTrash, FaUserFriends } from "react-icons/fa";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

const UsuariosPage = () => {
  const users = [
    {
      name: "Spencer",
      email: "Spencer@example.com",
      date: "May 22, 2025",
      compras: "0 Productos",
      ventas: "2 Productos",
      valoracion: "5.7 Estrellas",
    },
    {
      name: "Cristofer",
      email: "Cristofer@example.com",
      date: "May 22, 2025",
      compras: "0 Productos",
      ventas: "2 Productos",
      valoracion: "5.7 Estrellas",
    },
    {
      name: "Marcio",
      email: "Marcio@example.com",
      date: "May 22, 2025",
      compras: "0 Productos",
      ventas: "2 Productos",
      valoracion: "5.7 Estrellas",
    },
    {
      name: "Henry",
      email: "Henry@example.com",
      date: "May 22, 2025",
      compras: "0 Productos",
      ventas: "2 Productos",
      valoracion: "5.7 Estrellas",
    },
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="min-h-screen p-6 bg-bglight">
          {/* Stats Card */}
          <div className="w-full p-6 mb-6 bg-white border shadow-sm rounded-xl border-greylight hover:shadow-md md:w-64">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-greylight">
                  Total Usuarios Registrados
                </p>
                <p className="mt-1 text-2xl font-bold text-textdark">
                  4 <span className="font-semibold">Usuarios</span>
                </p>
                <div className="flex items-center mt-2">
                  <span className="flex items-center text-sm font-medium text-green-600">
                    <FaUserFriends className="mr-1" />
                    8%
                  </span>
                  <span className="ml-2 text-sm text-greylight">
                    vs último mes
                  </span>
                </div>
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
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-greylight">
                    Compras
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-greylight">
                    Ventas
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-greylight">
                    Valoracion
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-greylight">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-softgray">
                {users.map((user, idx) => (
                  <tr key={idx} className="hover:bg-softgray">
                    <td className="flex items-center px-6 py-4 whitespace-nowrap">
                      <img
                        src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                        alt={user.name}
                        className="w-8 h-8 mr-3 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium text-textdark">
                          {user.name}
                        </div>
                        <div className="text-sm text-greylight">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-greylight">
                      {user.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-textdark">
                      {user.compras}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-textdark">
                      {user.ventas}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-textdark">
                      {user.valoracion}
                    </td>
                    <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                      <div className="flex justify-center space-x-4">
                        <button className="text-accent hover:text-accent/80">
                          <FaEye />
                        </button>
                        <button className="text-textdark hover:text-greymid">
                          <FaEdit />
                        </button>
                        <button className="text-error hover:text-error/80">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Info */}
          <div className="p-6 bg-white border shadow-sm rounded-xl border-softgray">
            <h3 className="text-lg font-semibold text-textdark">
              Información Adicional
            </h3>
            <p className="mt-2 text-sm text-greylight">
              Placeholder for additional dashboard content or widgets.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UsuariosPage;

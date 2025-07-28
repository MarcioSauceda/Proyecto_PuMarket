import React from "react";
import { Link } from "react-router-dom";

const AdminUsersTable = () => {
  const users = [
    {
      name: "Spencer",
      email: "Spencer@example.com",
      date: "May 22, 2025",
      compras: "0 Productos",
      ventas: "2 Productos",
    },
    {
      name: "Cristofer",
      email: "Cristofer@example.com",
      date: "May 22, 2025",
      compras: "0 Productos",
      ventas: "2 Productos",
    },
    {
      name: "Marcio",
      email: "Marcio@example.com",
      date: "May 22, 2025",
      compras: "0 Productos",
      ventas: "2 Productos",
    },
    {
      name: "Henry",
      email: "Henry@example.com",
      date: "May 22, 2025",
      compras: "0 Productos",
      ventas: "2 Productos",
    },
  ];

  return (
    <div className="mb-6 overflow-x-auto bg-white border shadow-sm rounded-xl border-greylight">
      <div className="flex items-center justify-between px-6 py-4 border-b border-greylight">
        <h3 className="text-lg font-semibold text-textdark">
          Últimos usuarios registrados
        </h3>
        <Link
          to="/admin/users"
          className="px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary/80"
        >
          <i className="mr-2 fas fa-plus"></i>Gestionar Usuarios
        </Link>
      </div>
      <table className="w-full">
        <thead className="bg-greylight">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-textdark">
              Usuario
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-textdark">
              Fecha
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-textdark">
              Compras
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-textdark">
              Ventas
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-greylight">
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
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
                  <div className="text-sm text-greylight">{user.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-textdark">
                {user.date}
              </td>
              <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-textdark">
                {user.compras}
              </td>
              <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-textdark">
                {user.ventas}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;

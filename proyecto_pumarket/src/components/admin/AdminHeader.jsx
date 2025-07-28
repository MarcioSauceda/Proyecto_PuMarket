import React from "react";

const AdminHeader = () => {
  return (
    <header className="shadow bg-primary bg- border-greylight">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Dashboard Administrador
            </h1>
            <p className="mt-1 text-sm text-white">
              Bienvenido, aquí tienes los datos del marketplace.
            </p>
          </div>
          <div className="relative">
            <i className="absolute transform -translate-y-1/2 fas fa-search left-3 top-1/2 text-greylight"></i>
            <input
              type="text"
              placeholder="Buscar..."
              className="py-2 pl-10 pr-4 bg-gray-100 border rounded-lg outline-none border-greylight focus:ring-2 focus:ring-primary text-textdark"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

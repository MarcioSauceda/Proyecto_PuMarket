// src/pages/admin/OpcionesPage.jsx
import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const OpcionesPage = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="min-h-screen p-6 bg-bglight">
          <h1 className="mb-6 text-2xl font-semibold text-textdark">
            Configuración de Opciones
          </h1>

          {/* Sección básica de ajustes */}
          <section className="p-6 mb-6 bg-white border shadow-sm rounded-xl border-softgray">
            <h2 className="mb-4 text-lg font-medium text-textdark">
              Preferencias Generales
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-textdark">Mantenimiento del sitio</label>
                <input type="checkbox" className="toggle toggle-primary" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-textdark">
                  Notificaciones por email
                </label>
                <input type="checkbox" className="toggle toggle-accent" />
              </div>
            </div>
          </section>

          {/* Sección de datos de la tienda */}
          <section className="p-6 mb-6 bg-white border shadow-sm rounded-xl border-softgray">
            <h2 className="mb-4 text-lg font-medium text-textdark">
              Información del Marketplace
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-greylight">
                  Nombre del Sitio
                </label>
                <input
                  type="text"
                  defaultValue="Pu-Market"
                  className="w-full mt-1 input input-bordered"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-greylight">
                  Email de Contacto
                </label>
                <input
                  type="email"
                  defaultValue="admin@pu-market.com"
                  className="w-full mt-1 input input-bordered"
                />
              </div>
              <form className="space-y-4">
                {/* …otros campos… */}
                <div className="inline-block p-4 rounded-lg bg-accent">
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OpcionesPage;

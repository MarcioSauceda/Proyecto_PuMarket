import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminVentasTable = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/reportes/ventas")
      .then((res) => res.json())
      .then(setVentas)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-slate-100">
        <AdminHeader />
        <main className="p-6 min-h-screen">
          <h2 className="mb-6 text-2xl font-bold text-primary">
            Historial de Ventas
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-greylight">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-3 font-bold text-primary text-xs uppercase text-left">
                    ID
                  </th>
                  <th className="px-4 py-3 font-bold text-primary text-xs uppercase text-left">
                    Producto
                  </th>
                  <th className="px-4 py-3 font-bold text-primary text-xs uppercase text-left">
                    Vendedor
                  </th>
                  <th className="px-4 py-3 font-bold text-primary text-xs uppercase text-left">
                    Comprador
                  </th>
                  <th className="px-4 py-3 font-bold text-primary text-xs uppercase text-left">
                    Fecha
                  </th>
                  <th className="px-4 py-3 font-bold text-primary text-xs uppercase text-left">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-greylight">
                      Cargando...
                    </td>
                  </tr>
                ) : ventas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-greylight">
                      No hay ventas registradas.
                    </td>
                  </tr>
                ) : (
                  ventas.map((v, idx) => (
                    <tr
                      key={v.idVenta}
                      className={idx % 2 === 1 ? "bg-gray-50" : ""}
                    >
                      <td className="px-4 py-2 text-textdark">{v.idVenta}</td>
                      <td className="px-4 py-2 text-textdark">
                        {v.producto?.nombre || "-"}
                      </td>
                      <td className="px-4 py-2 text-textdark">
                        {v.vendedor?.nombre} {v.vendedor?.apellido}
                      </td>
                      <td className="px-4 py-2 text-textdark">
                        {v.comprador?.nombre} {v.comprador?.apellido}
                      </td>
                      <td className="px-4 py-2 text-textdark">
                        {v.fechaVenta
                          ? new Date(v.fechaVenta).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-2 text-textdark">
                        {v.precioVenta ? `L. ${v.precioVenta}` : "-"}
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

export default AdminVentasTable;

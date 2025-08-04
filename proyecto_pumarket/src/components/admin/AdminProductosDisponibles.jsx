// src/pages/admin/ProductosDisponiblesPage.jsx
import { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

const ProductosDisponiblesPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos disponibles al montar el componente
  useEffect(() => {
    fetch("http://localhost:8080/api/admin/productos/disponibles")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="min-h-screen p-6 bg-slate-100">
          <h1 className="mb-6 text-2xl font-semibold text-textdark">
            Productos Disponibles
          </h1>

          {/* Card de Total */}
          <div className="p-6 mb-8 transition-shadow bg-white border shadow-sm rounded-xl border-greylight hover:shadow-md w-full max-w-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-greylight">
                  Total Productos Disponibles
                </p>
                <p className="mt-2 text-3xl font-bold text-textdark">
                  {productos.length} Productos
                </p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent bg-opacity-10">
                <FaBox className="text-xl text-accent" />
              </div>
            </div>
          </div>

          {/* Tabla de Productos */}
<div className="overflow-x-auto bg-white rounded-lg shadow border border-greylight">
  <table className="min-w-full table-fixed">
    <thead className="bg-softgray">
      <tr>
        <th className="w-16 px-4 py-3 text-xs font-bold text-left text-black uppercase">ID</th>
        <th className="w-1/5 px-4 py-3 text-xs font-bold text-left text-black uppercase">Nombre</th>
        <th className="w-1/5 px-4 py-3 text-xs font-bold text-left text-black uppercase">Categoría</th>
        <th className="w-1/5 px-4 py-3 text-xs font-bold text-left text-black uppercase">Estado</th>
        <th className="w-1/5 px-4 py-3 text-xs font-bold text-left text-black uppercase">Vendedor</th>
        <th className="w-1/5 px-4 py-3 text-xs font-bold text-left text-black uppercase">Precio</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-softgray">
      {loading ? (
        <tr>
          <td colSpan={6} className="text-center py-8 text-greylight">
            Cargando...
          </td>
        </tr>
      ) : productos.length === 0 ? (
        <tr>
          <td colSpan={6} className="text-center py-8 text-greylight">
            No hay productos disponibles.
          </td>
        </tr>
      ) : (
        productos.map((p) => (
          <tr key={p.id}>
            <td className="w-16 px-4 py-2 text-left text-black">{p.id}</td>
            <td className="w-1/5 px-4 py-2 text-left text-black">{p.nombre}</td>
            <td className="w-1/5 px-4 py-2 text-left text-black">
              {p.categoria?.nombre || "-"}
            </td>
            <td className="w-1/5 px-4 py-2 text-left text-black">
              {p.estadoDelProducto?.nombre || "-"}
            </td>
            <td className="w-1/5 px-4 py-2 text-left text-black">
              {p.vendedor
                ? `${p.vendedor.nombre} ${p.vendedor.apellido}`
                : "-"}
            </td>
            <td className="w-1/5 px-4 py-2 text-left text-black">
              {p.precio ? `L. ${p.precio}` : "-"}
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

export default ProductosDisponiblesPage;

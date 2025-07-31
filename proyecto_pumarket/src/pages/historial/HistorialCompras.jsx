import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function HistorialCompras() {
  const { user } = useAuth();
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8080/api/ventas/comprador/${user.id}`
      );
      if (res.ok) {
        setCompras(await res.json());
      }
      setLoading(false);
    };
    if (user?.id) fetchCompras();
  }, [user]);

  if (loading)
    return <div className="p-8 text-center">Cargando compras...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Historial de Compras</h2>
      {compras.length === 0 ? (
        <p>No has realizado compras.</p>
      ) : (
        <table className="w-full border rounded">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Vendedor</th>
              <th>Precio</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.idVenta}>
                <td>{compra.producto?.nombre}</td>
                <td>
                  {compra.vendedor?.nombre} {compra.vendedor?.apellido}
                </td>
                <td>Lps. {compra.precioVenta}</td>
                <td>{new Date(compra.fechaVenta).toLocaleString("es-HN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link
        to="/profile"
        className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded"
      >
        Volver
      </Link>
    </div>
  );
}

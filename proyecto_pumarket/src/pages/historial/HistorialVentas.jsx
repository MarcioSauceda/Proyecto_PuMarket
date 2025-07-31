import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function HistorialVentas() {
  const { user } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVentas = async () => {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8080/api/ventas/vendedor/${user.id}`
      );
      if (res.ok) {
        setVentas(await res.json());
      }
      setLoading(false);
    };
    if (user?.id) fetchVentas();
  }, [user]);

  if (loading) return <div className="p-8 text-center">Cargando ventas...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Historial de Ventas</h2>
      {ventas.length === 0 ? (
        <p>No has realizado ventas.</p>
      ) : (
        <table className="w-full border rounded">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Comprador</th>
              <th>Precio</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.idVenta}>
                <td>{venta.producto?.nombre}</td>
                <td>
                  {venta.comprador?.nombre} {venta.comprador?.apellido}
                </td>
                <td>Lps. {venta.precioVenta}</td>
                <td>{new Date(venta.fechaVenta).toLocaleString("es-HN")}</td>
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

import { useEffect, useState } from "react";

/**
 * Modal para marcar un producto como vendido,
 * mostrando lista de compradores (conversaciones) para ese producto.
 *
 * Props:
 * - product: objeto producto (debe tener .id y .vendedor.id)
 * - onClose: función para cerrar el modal
 * - onSold: función callback que se llama después de registrar la venta
 */
export default function MarcarComoVendidoModal({ product, onClose, onSold }) {
  const [compradores, setCompradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Traer compradores únicos con quienes el vendedor tuvo conversación sobre ese producto
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8080/api/conversaciones/producto/${product.id}/vendedor/${product.vendedor.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Filtrar compradores únicos por id
        const unicos = [];
        const ids = new Set();
        data.forEach((conv) => {
          if (!ids.has(conv.comprador.id)) {
            ids.add(conv.comprador.id);
            unicos.push(conv.comprador);
          }
        });
        setCompradores(unicos);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando conversaciones.");
        setLoading(false);
      });
  }, [product]);

  // Función para marcar el producto como vendido a un comprador
  const handleVender = async (comprador) => {
    const res = await fetch("http://localhost:8080/api/ventas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idProducto: product.id,
        idVendedor: product.vendedor.id,
        idComprador: comprador.id,
        precioVenta: product.precio,
      }),
    });
    if (res.ok) {
      alert("¡Venta registrada!");
      if (onSold) onSold();
      onClose();
    } else {
      alert("Error al registrar la venta.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-black">
          ¿A quién le vendiste "{product.nombre}"?
        </h2>
        {loading && <p>Cargando posibles compradores...</p>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && compradores.length === 0 && (
          <div className="text-gray-500">
            No hay conversaciones con posibles compradores.
          </div>
        )}
        {!loading && compradores.length > 0 && (
          <ul className="divide-y">
            {compradores.map((c) => (
              <li key={c.id} className="py-2 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-black">
                    {c.nombre} {c.apellido}
                  </span>
                  <span className="text-xs text-black block">
                    {c.correoInstitucional}
                  </span>
                </div>
                <button
                  className="bg-primary px-3 py-1 text-white rounded hover:bg-blue-700"
                  onClick={() => handleVender(c)}
                >
                  Marcar venta
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          className="mt-5 block w-full py-2 border rounded text-primary border-primary hover:bg-primary hover:text-white"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

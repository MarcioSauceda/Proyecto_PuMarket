import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetailModal from "../components/ProductDetailModal";

export default function ProfileVendedor() {
  const { correo } = useParams();
  const navigate = useNavigate();
  const [vendedor, setVendedor] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Traer datos del vendedor y productos por correo
  useEffect(() => {
    // Traer datos del vendedor
    const fetchVendedor = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/usuarios/correo/${correo}`
        );
        if (res.ok) {
          const data = await res.json();
          setVendedor(data);
        }
      } catch (error) {
        setVendedor(null);
      }
    };

    // Traer productos del vendedor
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/productos/vendedor-correo/${correo}`
        );
        if (res.ok) {
          const data = await res.json();
          setSellerProducts(data);
        }
      } catch (error) {
        setSellerProducts([]);
      }
    };

    if (correo) {
      fetchVendedor();
      fetchProducts();
    }
  }, [correo]);

  // Filtro de productos
  const filteredProducts = sellerProducts.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!vendedor) {
    return <p className="text-center mt-12">Cargando perfil del vendedor...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-primary text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-xl font-semibold">
            Perfil de {vendedor.nombre} {vendedor.apellido}
          </span>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
            />
            <Link
              to="/dashboard"
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Volver Dashboard
            </Link>
            <Link
              to="/messages"
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Mensajería
            </Link>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-6 flex-1">
        {/* Botón de reseña */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-textdark">
            Productos de {vendedor.nombre}
          </h2>
          <Link
            to={`/reseñasperfilvendedor/${vendedor.correoInstitucional}`}
            className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
          >
            Dejar Reseña
          </Link>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <img
                  src={
                    product.imagenes && product.imagenes.length > 0
                      ? typeof product.imagenes[0] === "string"
                        ? product.imagenes[0]
                        : product.imagenes[0].urlImagen ||
                          "https://via.placeholder.com/300x200"
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={product.nombre}
                  className="w-full h-48 object-cover rounded cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsDetailModalOpen(true);
                  }}
                />
                <div className="mt-4 flex-1 space-y-2">
                  <p className="text-textdark font-medium">{product.nombre}</p>
                  <p className="text-textdark text-sm line-clamp-2">
                    {product.descripcion}
                  </p>
                  <p className="text-textdark font-semibold">
                    Lps. {product.precio}
                  </p>
                </div>
                {/* Botón para enviar mensaje (por producto) */}
                <div className="mt-4 flex">
                  <button
                    onClick={() =>
                      navigate(`/messages/${vendedor.correoInstitucional}`)
                    }
                    className="flex-1 px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-textdark">
            No tiene productos disponibles.
          </p>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-greylight py-4">
        <p className="text-center text-textdark text-sm">
          © {new Date().getFullYear()} Pu-Market | Todos los derechos reservados
        </p>
      </footer>

      {/* MODAL DE DETALLE */}
      {isDetailModalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isEditing={false}
          onClose={() => setIsDetailModalOpen(false)}
          onEditProduct={() => {}}
        />
      )}
    </div>
  );
}

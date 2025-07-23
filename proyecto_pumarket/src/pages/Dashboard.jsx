import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProductDetailModal from "../components/ProductDetailModal";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Obtener productos desde el backend excluyendo al vendedor actual
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productos/excluir-vendedor/${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al obtener productos");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
        setProducts([]);
      }
    };
    if (user?.id) fetchProducts();
  }, [user]);

  if (!user) {
    navigate("/");
    return null;
  }

  // Filtrado de productos
  const filteredProducts = products.filter((product) =>
    [
      product.nombre,
      product.descripcion,
      product?.categoria?.nombre,
      product?.vendedor?.correoInstitucional,
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };
  const handleMessageSeller = (email) => {
    navigate(`/messages/${email}`);
  };
  const handleViewSellerProfile = (email) => {
    navigate(`/profile/${email}`);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-primary text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xl font-semibold">PuMarket</span>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Buscar productos o vendedores..."
              aria-label="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Link
              to="/profile"
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Ver Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <h2 className="text-2xl font-bold mb-6 text-textdark text-center">
          Productos Disponibles
        </h2>
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
                  onClick={() => handleViewProduct(product)}
                />
                <h3 className="mt-4 text-lg font-semibold text-textdark">
                  {product.nombre}
                </h3>
                <p className="mt-2 text-sm text-textdark line-clamp-2">
                  {product.descripcion}
                </p>
                <p className="mt-2 text-textdark">
                  <strong>Precio:</strong> ${product.precio}
                </p>
                <p className="text-textdark">
                  <strong>Vendedor:</strong>{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() =>
                      handleViewSellerProfile(
                        product.vendedor.correoInstitucional
                      )
                    }
                  >
                    {product.vendedor.correoInstitucional}
                  </span>
                </p>
                <div className="mt-auto pt-4 flex space-x-2">
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="flex-1 px-3 py-1 bg-primary text-white rounded hover:opacity-90"
                  >
                    Ver Producto
                  </button>
                  <button
                    onClick={() =>
                      handleMessageSeller(product.vendedor.correoInstitucional)
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
            No se encontraron productos.
          </p>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-greylight py-4">
        <p className="text-center text-textdark text-sm">
          © {new Date().getFullYear()} PuMarket | Todos los derechos reservados
        </p>
      </footer>

      {/* MODAL DETALLE */}
      {isDetailModalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isEditing={false}
          onClose={handleCloseModal}
          onEditProduct={() => {}}
        />
      )}
    </div>
  );
}

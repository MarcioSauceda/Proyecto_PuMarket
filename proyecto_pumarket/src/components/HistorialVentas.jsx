import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddProductModal from "../components/AddProductModal";
import ProductDetailModal from "../components/ProductDetailModal";
import { useAuth } from "../context/AuthContext";

export default function HistorialVentas() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productos/vendedor/${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserProducts(data);
        } else {
          console.error("Error al obtener productos del usuario");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    if (user?.id) fetchUserProducts();
  }, [user]);

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: newProduct.nombre,
          descripcion: newProduct.descripcion,
          precio: newProduct.precio,
          categoria: { id: newProduct.categoriaId },
          vendedor: { id: user.id },
        }),
      });
      if (response.ok) {
        const created = await response.json();
        setUserProducts([...userProducts, created]);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
    setIsAddModalOpen(false);
  };

  /*const handleDeleteProduct = async (productId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      const res = await fetch(
        `http://localhost:8080/api/productos/${productId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setUserProducts(userProducts.filter((p) => p.id !== productId));
      }
    }
  };
*/

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredProducts = userProducts.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    navigate("/");
    return null;
  }

   const handleViewSellerProfile = (email) => {
    navigate(`/profile/${email}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-primary text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-2xl font-semibold">Mi Perfil</span>
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-textdark">Historial de Ventas</h2>
          <Link
              to="/historialcompras"
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Historial Compras
            </Link>
          <Link
              to="/historialventas"
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Historial Ventas
            </Link>
          <Link
              to="/profile"
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Volver Perfil
            </Link>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <img
                  src={product.imagen || "https://via.placeholder.com/300x200"}
                  alt={product.nombre}
                  className="w-full h-48 object-cover rounded cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsDetailModalOpen(true);
                    setIsEditing(false);
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
                <div className="mt-4 flex space-x-2">
                  <p className="text-textdark">
                    <strong>Comprador:</strong>{" "}
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-textdark">
            No tienes productos vendidos.
          </p>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-greylight py-4">
        <p className="text-center text-textdark text-sm">
          © {new Date().getFullYear()} Pu-Market | Todos los derechos reservados
        </p>
      </footer>

      {/* MODALES */}
      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
        />
      )}
      {isDetailModalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isEditing={isEditing}
          onClose={() => setIsDetailModalOpen(false)}
          onEditProduct={() => {}}
        />
      )}
    </div>
  );
}

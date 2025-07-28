import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddProductModal from "../components/AddProductModal";
import ProductDetailModal from "../components/ProductDetailModal";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
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

  const handleDeleteProduct = async (productId) => {
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

  const handleEditProduct = async (updatedProduct) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/productos/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: updatedProduct.nombre,
            descripcion: updatedProduct.descripcion,
            precio: updatedProduct.precio,
            categoria: { id: updatedProduct.categoriaId },
            vendedor: { id: user.id },
            estadoDelProducto: updatedProduct.estadoDelProducto, // Si usas ese campo
          }),
        }
      );
      if (response.ok) {
        const editado = await response.json();
        setUserProducts(
          userProducts.map((p) => (p.id === editado.id ? editado : p))
        );
      }
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
    setIsAddModalOpen(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-primary text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-semibold">Mi Perfil</span>
            <span className="text-lg font-medium text-white px-3 py-1 rounded">
              {user?.nombre} {user?.apellido}
            </span>
          </div>
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
        <div className="mb-4">
          {/* Encabezado superior: título y botón de reseñas */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-textdark">Mis productos</h2>

            {/* Botón de Reseñas */}
            <Link
              to="/reseñasperfil"
              className="px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
            >
              Reseñas
            </Link>
          </div>

          {/* Botones debajo, alineados a la derecha */}
          <div className="flex justify-end space-x-2">
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
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
            >
              Agregar Producto
            </button>
          </div>
        </div>

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

                {/* Botones */}
                <div className="mt-4 space-y-2">
                  {/* Fila con Editar y Eliminar */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsEditing(true);
                        setIsAddModalOpen(true);
                      }}
                      className="flex-1 px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
                    >
                      Eliminar
                    </button>
                  </div>

                  {/* Botón Marcar como vendido */}
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full px-3 py-1 bg-primary text-white rounded hover:opacity-90"
                  >
                    Marcar como vendido
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-textdark">
            No tienes productos publicados.
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
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedProduct(null);
            setIsEditing(false);
          }}
          onAddProduct={handleAddProduct}
          isEditing={isEditing}
          productToEdit={selectedProduct}
          onEditProduct={handleEditProduct}
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

/*className="flex-1 px-3 py-1 bg-primary text-white rounded hover:opacity-90"*/

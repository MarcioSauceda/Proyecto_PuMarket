import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddProductModal from "./AddProductModal";
import ProductDetailModal from "./ProductDetailModal";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

    if (user?.id) {
      fetchUserProducts();
    }
  }, [user]);

  const handleAddProduct = async (newProduct) => {
    console.log("Usuario actual:", user);
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
      } else {
        console.error("Error al crear producto");
      }
    } catch (error) {
      console.error("Error de conexión al crear producto:", error);
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      const res = await fetch(
        `http://localhost:8080/api/productos/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setUserProducts(
          userProducts.filter((product) => product.id !== productId)
        );
      }
    }
  };

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
    setIsEditing(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>Perfil de {user.email}</h2>
        <div className="header-actions">
          <Link to="/dashboard" className="btn btn-dashboard">
            Volver al Dashboard
          </Link>
          <Link to="/messages" className="btn btn-messages">
            Mensajería
          </Link>
          <button onClick={handleLogout} className="btn btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="add-product">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-add-product"
        >
          Agregar Producto
        </button>
      </div>

      <div className="product-grid">
        {userProducts.length > 0 ? (
          userProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={"https://via.placeholder.com/150"}
                  alt={product.nombre}
                  className="product-image"
                  onClick={() => handleOpenDetail(product)}
                />
                <div className="product-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleOpenEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="product-info">
                <p className="product-description">{product.nombre}</p>
                <p className="product-price">Lps. {product.precio}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes productos publicados.</p>
        )}
      </div>

      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
        />
      )}

      {isDetailModalOpen && (
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

export default Profile;

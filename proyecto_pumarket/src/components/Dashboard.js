import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProductDetailModal from "./ProductDetailModal";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Obtener productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/productos");
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
    fetchProducts();
  }, []);

  // Filtro de búsqueda
  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.vendedor.correoInstitucional
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleMessageSeller = (sellerEmail) => {
    navigate(`/messages/${sellerEmail}`);
  };

  const handleViewSellerProfile = (sellerEmail) => {
    navigate(`/profile/${sellerEmail}`);
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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>PuMarket - Bienvenido, {user.email}</h2>
        <div className="header-actions">
          <Link to="/profile" className="btn btn-profile">
            Ver Perfil
          </Link>
          <button onClick={handleLogout} className="btn btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos o vendedores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={"https://via.placeholder.com/150"}
                  alt={product.nombre}
                  className="product-image"
                  onClick={() => handleViewProduct(product)}
                />
              </div>
              <h3>{product.nombre}</h3>
              <p>
                <strong>Descripción:</strong> {product.descripcion}
              </p>
              <p>
                <strong>Precio:</strong> ${product.precio}
              </p>
              <p>
                <strong>Vendedor:</strong>{" "}
                <span
                  className="seller-link"
                  onClick={() =>
                    handleViewSellerProfile(
                      product.vendedor.correoInstitucional
                    )
                  }
                >
                  {product.vendedor.correoInstitucional}
                </span>
              </p>
              <div className="product-actions">
                <button
                  className="btn btn-view"
                  onClick={() => handleViewProduct(product)}
                >
                  Ver Producto
                </button>
                <button
                  className="btn btn-message"
                  onClick={() =>
                    handleMessageSeller(product.vendedor.correoInstitucional)
                  }
                >
                  Enviar Mensaje
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

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

export default Dashboard;

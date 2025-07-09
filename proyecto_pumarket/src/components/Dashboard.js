import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductDetailModal from './ProductDetailModal'; // Importar el modal
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Error al obtener productos');
          setProducts([]); // Evitar errores si el backend falla
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase()) // Buscar por vendedor
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
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>PuMarket - Bienvenido, {user.email}</h2>
        <div className="header-actions">
          <Link to="/profile" className="btn btn-profile">Ver Perfil</Link>
          <button onClick={handleLogout} className="btn btn-logout">Cerrar Sesión</button>
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
                  src={product.images[0] || 'https://via.placeholder.com/150'}
                  alt={product.title}
                  className="product-image"
                  onClick={() => handleViewProduct(product)}
                />
              </div>
              <h3>{product.title}</h3>
              <p><strong>Descripción:</strong> {product.description}</p>
              <p><strong>Precio:</strong> ${product.price}</p>
              <p>
                <strong>Vendedor:</strong>{' '}
                <span
                  className="seller-link"
                  onClick={() => handleViewSellerProfile(product.seller)}
                >
                  {product.seller}
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
                  onClick={() => handleMessageSeller(product.seller)}
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
          onEditProduct={() => {}} // No se usa en modo visualización
        />
      )}
    </div>
  );
}

export default Dashboard;
//con fetch 

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

// Datos simulados de productos (quitar cuando el backend esté listo)
const mockProducts = [
  {
    id: 1,
    title: 'Laptop HP',
    category: 'Electrónica',
    condition: 'Usado',
    description: 'Laptop en buen estado, 8GB RAM',
    price: 300,
    status: 'Disponible',
    seller: 'juan.perez@unah.hn',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: 2,
    title: 'Silla de Oficina',
    category: 'Muebles',
    condition: 'Nuevo',
    description: 'Silla ergonómica negra',
    price: 50,
    status: 'Disponible',
    seller: 'maria.gomez@unah.hn',
    images: ['https://via.placeholder.com/150'],
  },
];

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(mockProducts);

  // Cargar productos desde el backend cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajusta según tu autenticación
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Actualiza el estado con los productos del backend
        } else {
          console.error('Error al obtener productos');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleMessageSeller = (sellerEmail) => {
    alert(`Enviando mensaje a ${sellerEmail}`);
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
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.images[0] || 'https://via.placeholder.com/150'}
                alt={product.title}
                className="product-image"
                onClick={() => handleViewProduct(product.id)}
              />
              <h3>{product.title}</h3>
              <p><strong>Descripción:</strong> {product.description}</p>
              <p><strong>Precio:</strong> ${product.price}</p>
              <p><strong>Vendedor:</strong> {product.seller}</p>
              <button
                className="btn btn-view"
                onClick={() => handleViewProduct(product.id)}
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
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard; 
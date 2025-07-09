//CON FETCH

/*import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddProductModal from './AddProductModal';
import ProductDetailModal from './ProductDetailModal';
import './Profile.css';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserProducts = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/users/${user.id}/products`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserProducts(data);
          } else {
            console.error('Error al obtener productos del usuario');
          }
        } catch (error) {
          console.error('Error de conexión:', error);
        }
      };
      fetchUserProducts();
    }
  }, [user]);

  const handleAddProduct = async (newProduct) => {
    try {
      const formData = new FormData();
      formData.append('title', newProduct.title);
      formData.append('category', newProduct.category);
      formData.append('condition', newProduct.condition);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('status', 'Disponible');
      formData.append('seller', user.email);
      newProduct.images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      if (response.ok) {
        const addedProduct = await response.json();
        setUserProducts([...userProducts, addedProduct]);
        setIsAddModalOpen(false);
      } else {
        alert('Error al agregar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      if (response.ok) {
        setUserProducts(
          userProducts.map((product) =>
            product.id === updatedProduct.id ? { ...updatedProduct } : product
          )
        );
        setIsDetailModalOpen(false);
        setIsEditing(false);
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          setUserProducts(userProducts.filter((product) => product.id !== productId));
        } else {
          alert('Error al eliminar el producto');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
      }
    }
  };

  const handleMarkAsSold = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'Vendido' }),
      });
      if (response.ok) {
        setUserProducts(
          userProducts.map((product) =>
            product.id === productId ? { ...product, status: 'Vendido' } : product
          )
        );
      } else {
        alert('Error al marcar como vendido');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  const handleMarkAsOutOfStock = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'Agotado' }),
      });
      if (response.ok) {
        setUserProducts(
          userProducts.map((product) =>
            product.id === productId ? { ...product, status: 'Agotado' } : product
          )
        );
      } else {
        alert('Error al marcar como agotado');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
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
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>Perfil de {user.email}</h2>
        <div className="header-actions">
          <Link to="/dashboard" className="btn btn-dashboard">Volver al Dashboard</Link>
          <button onClick={handleLogout} className="btn btn-logout">Cerrar Sesión</button>
        </div>
      </header>

      <div className="add-product">
        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-add-product">
          Agregar Producto
        </button>
      </div>

      <div className="product-grid">
        {userProducts.length > 0 ? (
          userProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.images[0] || 'https://via.placeholder.com/150'}
                  alt={product.title}
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
                    className="btn btn-sold"
                    onClick={() => handleMarkAsSold(product.id)}
                    disabled={product.status !== 'Disponible'}
                  >
                    Marcar como Vendido
                  </button>
                  <button
                    className="btn btn-out-of-stock"
                    onClick={() => handleMarkAsOutOfStock(product.id)}
                    disabled={product.status !== 'Disponible'}
                  >
                    Marcar como Agotado
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
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <p className="product-status">{product.status}</p>
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
          onEditProduct={handleEditProduct}
        />
      )}
    </div>
  );
}

export default Profile; */



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddProductModal from './AddProductModal';
import ProductDetailModal from './ProductDetailModal';
import './Profile.css';

// Productos simulados del usuario logueado (reemplazar con datos de SQL Server)
const mockUserProducts = [
  {
    id: 1,
    title: 'Laptop HP',
    category: 'Electrónica',
    condition: 'Usado',
    description: 'Laptop en buen estado, 8GB RAM',
    price: 300,
    status: 'Disponible',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: 2,
    title: 'Libro de Programación',
    category: 'Libros',
    condition: 'Usado',
    description: 'Libro de JavaScript avanzado',
    price: 20,
    status: 'Disponible',
    images: ['https://via.placeholder.com/150'],
  },
];

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState(mockUserProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddProduct = (newProduct) => {
    setUserProducts([...userProducts, { id: userProducts.length + 1, ...newProduct, status: 'Disponible' }]);
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setUserProducts(
      userProducts.map((product) =>
        product.id === updatedProduct.id ? { ...updatedProduct } : product
      )
    );
    setIsDetailModalOpen(false);
    setIsEditing(false);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setUserProducts(userProducts.filter((product) => product.id !== productId));
    }
  };

  const handleMarkAsSold = (productId) => {
    setUserProducts(
      userProducts.map((product) =>
        product.id === productId ? { ...product, status: 'Vendido' } : product
      )
    );
  };

  const handleMarkAsOutOfStock = (productId) => {
    setUserProducts(
      userProducts.map((product) =>
        product.id === productId ? { ...product, status: 'Agotado' } : product
      )
    );
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
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>Perfil de {user.email}</h2>
        <div className="header-actions">
          <Link to="/dashboard" className="btn btn-dashboard">Volver al Dashboard</Link>
          <Link to="/messages" className="btn btn-messages">Mensajería</Link>
          <button onClick={handleLogout} className="btn btn-logout">Cerrar Sesión</button>
        </div>
      </header>

      <div className="add-product">
        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-add-product">
          Agregar Producto
        </button>
      </div>

      <div className="product-grid">
        {userProducts.length > 0 ? (
          userProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.images[0] || 'https://via.placeholder.com/150'}
                  alt={product.title}
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
                    className="btn btn-sold"
                    onClick={() => handleMarkAsSold(product.id)}
                    disabled={product.status !== 'Disponible'}
                  >
                    Marcar como Vendido
                  </button>
                  <button
                    className="btn btn-out-of-stock"
                    onClick={() => handleMarkAsOutOfStock(product.id)}
                    disabled={product.status !== 'Disponible'}
                  >
                    Marcar como Agotado
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
                <p className="product-description">{product.title}</p>
                <p className="product-price">Lps. {product.price}</p>
                <p className="product-status">{product.status}</p>
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
          onEditProduct={handleEditProduct}
        />
      )}
    </div>
  );
}

export default Profile;
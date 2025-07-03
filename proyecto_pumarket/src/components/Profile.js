import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AddProductModal from './AddProductModal';
import './Profile.css';

// Productos simulados del usuario logueado (reemplazar con datos de un backend en el futuro)
const mockUserProducts = [
{ id: 1, title: 'Laptop HP', category: 'Electrónica', condition: 'Usado', description: 'Laptop en buen estado, 8GB RAM', price: 300 },
{ id: 2, title: 'Libro de Programación', category: 'Libros', condition: 'Usado', description: 'Libro de JavaScript avanzado', price: 20 },
];

function Profile() {
const { user, logout } = useAuth();
const navigate = useNavigate();
const [isModalOpen, setIsModalOpen] = useState(false);
const [userProducts, setUserProducts] = useState(mockUserProducts);

const handleAddProduct = (newProduct) => {
    setUserProducts([...userProducts, { id: userProducts.length + 1, ...newProduct }]);
    setIsModalOpen(false);
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
        <button onClick={() => setIsModalOpen(true)} className="btn btn-add-product">
        Agregar Producto
        </button>
    </div>

    <div className="product-grid">
        {userProducts.length > 0 ? (
        userProducts.map((product) => (
            <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p><strong>Categoría:</strong> {product.category}</p>
            <p><strong>Estado:</strong> {product.condition}</p>
            <p><strong>Descripción:</strong> {product.description}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            </div>
        ))
        ) : (
        <p>No tienes productos publicados.</p>
        )}
    </div>

    {isModalOpen && (
        <AddProductModal
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
        />
    )}
    </div>
);
}

export default Profile;
/*import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
const { user, logout } = useAuth();
const navigate = useNavigate();

if (!user) {
    navigate('/');
    return null;
}

return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>Bienvenido, {user.email}</h2>
    <p>¡Has iniciado sesión con éxito!</p>
    <button onClick={logout}>Cerrar Sesión</button>
    </div>
);
}

export default Dashboard; */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

// Datos simulados de productos (reemplazar con una API en el futuro)
const mockProducts = [
    { id: 1, title: 'Laptop HP', category: 'Electrónica', condition: 'Usado', description: 'Laptop en buen estado, 8GB RAM', price: 300, seller: 'juan.perez@unah.hn' },
    { id: 2, title: 'Silla de Oficina', category: 'Muebles', condition: 'Nuevo', description: 'Silla ergonómica negra', price: 50, seller: 'maria.gomez@unah.hn' },
    { id: 3, title: 'Libro de Programación', category: 'Libros', condition: 'Usado', description: 'Libro de JavaScript avanzado', price: 20, seller: 'juan.perez@unah.hn' },
];

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar productos según el término de búsqueda
    const filteredProducts = mockProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewProduct = (productId) => {
        // Redirigir a una página de detalles del producto (a implementar)
        navigate(`/product/${productId}`);
    };

    const handleMessageSeller = (sellerEmail) => {
        // Simulación de enviar un mensaje (puedes conectar con un backend de mensajería)
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
                    <Link to="/buscar" className="btn btn-search">Buscar Productos</Link> {/* Boton que agregue */}
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
                            <h3>{product.title}</h3>
                            <p><strong>Categoría:</strong> {product.category}</p>
                            <p><strong>Estado:</strong> {product.condition}</p>
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

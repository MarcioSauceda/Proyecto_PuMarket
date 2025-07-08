import React, { useState } from 'react';
import './SearchProducts.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SearchProducts = () => {
  const { user } = useAuth();        // ✅ Hook válido
  const navigate = useNavigate();   // ✅ Hook válido

  const [name, setName] = useState('');         // ✅ Hooks deben ir al principio
  const [category, setCategory] = useState(''); // ✅

  // 🚨 Solo aquí validamos y retornamos después de todos los hooks
  if (!user) {
    navigate('/');
    return null;
  }

  const sampleProducts = [
    { id: 1, name: 'Camisa', category: 'ropa', price: 250, seller: 'Carlos' },
    { id: 2, name: 'Laptop', category: 'tecnología', price: 18000, seller: 'Ana' },
    { id: 3, name: 'Gorra', category: 'accesorios', price: 150, seller: 'Luis' },
  ];

  const filteredProducts = sampleProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(name.toLowerCase()) &&
      (category === '' || product.category === category)
    );
  });

  return (
    <div className="search-products-container">
      <h2>Búsqueda de productos</h2>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="ropa">Ropa</option>
        <option value="tecnología">Tecnología</option>
        <option value="accesorios">Accesorios</option>
      </select>

      <ul className="results">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - L.{product.price} - Vendedor: {product.seller}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchProducts;



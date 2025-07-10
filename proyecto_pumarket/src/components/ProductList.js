// src/components/ProductList.js
import React from 'react';
import './ProductList.css';

function ProductList({ products }) {
  return (
    <div className="product-list">
      <h2>Productos disponibles</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.images[0]} alt={product.title} className="product-image" />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">Lps. {product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;

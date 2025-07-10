import React from 'react';
import './ProductList.css';

const products = [
  {
    id: 1,
    title: 'Laptop Lenovo',
    price: 9500,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Escritorio de Madera',
    price: 3200,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Camisa Universitaria',
    price: 450,
    image: 'https://via.placeholder.com/150',
  },
];

const ProductList = () => {
  return (
    <div className="product-list">
      <h2>Productos Destacados</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Lps. {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

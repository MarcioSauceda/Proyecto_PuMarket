import React from "react";
import { Link } from "react-router-dom";

const AdminLatestProducts = () => {
  const products = [
    {
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: "$1,299",
      growth: "+12%",
    },
    {
      name: "MacBook Pro",
      category: "Computers",
      price: "$2,499",
      growth: "+8%",
    },
    { name: "AirPods Pro", category: "Audio", price: "$249", growth: "+15%" },
    {
      name: "Apple Watch",
      category: "Wearables",
      price: "$399",
      growth: "+6%",
    },
  ];

  return (
    <div className="p-6 mb-6 bg-white border shadow-sm rounded-xl border-greylight">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-textdark">
          Últimos Productos Vendidos
        </h3>
        <Link
          to="/admin/products"
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          Ver Todos
        </Link>
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img
              src="https://i.ytimg.com/vi/08JoSCHV9VY/hq720.jpg"
              alt={product.name}
              className="w-12 h-12 rounded-lg"
            />
            <div className="flex-1">
              <p className="font-medium text-textdark">{product.name}</p>
              <p className="text-sm text-greylight">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-textdark">{product.price}</p>
              <p className="text-sm text-green-600">{product.growth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLatestProducts;

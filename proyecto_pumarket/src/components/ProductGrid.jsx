import React from "react";

const ProductGrid = () => {
  return (
    <section className="py-12 px-4 sm:px-8 text-center">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-10">
        Productos populares
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <div className="h-32 w-full bg-gray-200 mb-4" />
            <h4 className="font-semibold text-base sm:text-lg">
              Producto {id}
            </h4>
            <p className="text-sm text-gray-600">Lps. 100</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;

import React from "react";
import producto1 from "../assets/producto1.jpg";
import producto2 from "../assets/producto2.jpg";
import producto3 from "../assets/producto3.jpg";
import producto4 from "../assets/producto4.jpg";

const images = [producto1, producto2, producto3, producto4];

const ProductCarousel = () => {
  return (
    <section className="py-12 px-4 sm:px-8 text-center">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-10">
        Productos populares
      </h3>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-6 snap-x snap-mandatory pb-4 w-max justify-center mx-auto">
          {images.map((img, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white border p-4 rounded shadow hover:shadow-lg transition snap-start flex-shrink-0"
            >
              <img
                src={img}
                alt={`Producto ${index + 1}`}
                className="mb-4 rounded w-full h-40 object-cover"
              />
              <h4 className="font-semibold text-base sm:text-lg">
                Producto {index + 1}
              </h4>
              <p className="text-sm text-gray-600">Lps. 100</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;

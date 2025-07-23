import React from "react";

const Benefits = () => {
  return (
    <section className="py-12 px-4 sm:px-8 text-center">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-10">
        ¿Por qué usar Pumarket?
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-[#FFCC00] p-6 rounded shadow hover:scale-105 transition">
          <h4 className="font-semibold text-[#002664] text-lg sm:text-xl">
            Fácil acceso
          </h4>
          <p className="text-sm sm:text-base">
            Usa tu correo UNAH y entra en segundos.
          </p>
        </div>
        <div className="bg-[#FFCC00] p-6 rounded shadow hover:scale-105 transition">
          <h4 className="font-semibold text-[#002664] text-lg sm:text-xl">
            Seguro
          </h4>
          <p className="text-sm sm:text-base">
            Evita estafas, trata directamente con compañeros del campus.
          </p>
        </div>
        <div className="bg-[#FFCC00] p-6 rounded shadow hover:scale-105 transition">
          <h4 className="font-semibold text-[#002664] text-lg sm:text-xl">
            Sin comisiones
          </h4>
          <p className="text-sm sm:text-base">
            Publica y vende sin pagar nada adicional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;

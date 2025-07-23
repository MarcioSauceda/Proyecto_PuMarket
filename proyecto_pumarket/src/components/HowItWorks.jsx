import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-12 px-4 sm:px-8 bg-[#F7F7F7] text-center">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-10">
        ¿Cómo funciona?
      </h3>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition space-y-4">
          <div className="text-5xl bg-[#FFCC00] w-16 h-16 mx-auto rounded-full flex items-center justify-center text-[#002664]">
            1️⃣
          </div>
          <p className="text-sm sm:text-base font-semibold text-[#002664]">
            Crea tu cuenta con correo UNAH
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition space-y-4">
          <div className="text-5xl bg-[#FFCC00] w-16 h-16 mx-auto rounded-full flex items-center justify-center text-[#002664]">
            2️⃣
          </div>
          <p className="text-sm sm:text-base font-semibold text-[#002664]">
            Publica tus productos o encuentra lo que necesitas
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition space-y-4">
          <div className="text-5xl bg-[#FFCC00] w-16 h-16 mx-auto rounded-full flex items-center justify-center text-[#002664]">
            3️⃣
          </div>
          <p className="text-sm sm:text-base font-semibold text-[#002664]">
            Concreta el trato con seguridad dentro del campus
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

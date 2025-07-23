import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg_unah.jpg"; // Ruta a tu imagen de fondo
import Footer from "../components/Footer";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@unah\.hn$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      setEmailError(
        emailRegex.test(value)
          ? ""
          : "El correo debe tener el formato nombre.apellido@unah.hn"
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Lógica de registro...
      setMensaje("✅ ¡Registro exitoso!");
      setFormData({
        firstName: "",
        lastName: "",
        idNumber: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sección principal que crece para empujar el footer */}
      <div
        className="relative flex items-center justify-center flex-grow bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay negro transparente */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Contenedor del formulario */}
        <div className="relative z-10 w-full max-w-[600px] bg-gray-50 bg-opacity-55 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Registrarse
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Nombre */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-2 text-textdark"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Ej. Juan"
                className="block w-full px-4 py-2 bg-white text-textdark border border-greylight rounded transition duration-200 ease-in-out focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
            </div>

            {/* Apellido */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-2 text-textdark"
              >
                Apellido:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Ej. Pérez"
                className="block w-full px-4 py-2 bg-white text-textdark border border-greylight rounded transition duration-200 ease-in-out focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
            </div>

            {/* Número de Identificación */}
            <div>
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium mb-2 text-textdark"
              >
                Número de Identificación:
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
                placeholder="Ej. 20191002121"
                className="block w-full px-4 py-2 bg-white text-textdark border border-greylight rounded transition duration-200 ease-in-out focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
            </div>

            {/* Correo Institucional */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-textdark"
              >
                Correo Institucional:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="nombre.apellido@unah.hn"
                className={`block w-full px-4 py-2 bg-white text-textdark rounded transition duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${
                  emailError ? "border-red-600" : "border-greylight"
                }`}
              />
              {emailError && (
                <p className="text-red-600 text-sm mt-2">{emailError}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-textdark"
              >
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 bg-white text-textdark border border-greylight rounded transition duration-200 ease-in-out focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={!!emailError}
              className="w-full py-2 bg-accent text-textdark rounded-md font-semibold uppercase shadow-md transition duration-150 ease-in-out hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Registrarse
            </button>
          </form>

          {/* Mensaje de feedback */}
          {mensaje && (
            <div
              className={`mt-4 px-4 py-3 rounded ${
                mensaje.startsWith("✅")
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              {mensaje}
            </div>
          )}

          {/* Link a login */}
          <p className="mt-4 text-sm text-center text-textdark">
            ¿Ya tienes cuenta?{" "}
            <Link to="/" className="text-primary hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      {/* Footer siempre al pie */}
      <Footer />
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../assets/bg1.png";
import Logo from "../assets/logoPuma3.svg";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validar dominio
    if (!email.toLowerCase().endsWith("@unah.hn")) {
      setError("Solo se permite iniciar sesión con correos @unah.hn");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, password }),
      });

      if (!response.ok) {
        const mensaje = await response.text();
        throw new Error(mensaje);
      }

      const usuario = await response.json();
      login({
        id: usuario.id,
        correo: usuario.correoInstitucional,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="relative h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      />
      {/* Contenido encima del fondo */}
      <div className="relative z-10 h-full flex items-center justify-center bg-bglight bg-opacity-50 text-textdark">
        <div className="flex flex-wrap items-center justify-center lg:justify-between w-full max-w-5xl p-6 gap-6">
          {/* Logo */}
          <div className="mb-12 md:mb-0 md:w-9/12 lg:w-6/12 xl:w-6/12">
            <img src={Logo} alt="Logo" loading="lazy" className="-mt-16" />
          </div>
          {/* Formulario */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form
              onSubmit={handleLogin}
              className="bg-white p-6 rounded-lg shadow-md border border-greylight"
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-primary">
                Iniciar Sesión
              </h2>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-textdark">
                  Correo institucional
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="nombre.apellido@unah.hn"
                  className="block w-full px-4 py-2 text-textdark bg-white border border-greylight rounded transition ease-in-out duration-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              {/* Contraseña */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-textdark">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-4 py-2 text-textdark bg-white border border-greylight rounded transition ease-in-out duration-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-accent text-textdark rounded-md font-semibold uppercase shadow-md transition ease-in-out duration-150 hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              >
                Iniciar Sesión
              </button>

              <p className="mt-4 text-sm font-semibold text-center text-textdark">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Regístrate aquí
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </section>
  );
}

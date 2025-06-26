import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // Expresión regular para validar correo institucional (nombre.apellido@unah.hn)
  const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@unah\.hn$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setEmailError(
          "El correo debe tener el formato nombre.apellido@unah.hn"
        );
      } else {
        setEmailError("");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(formData.email)) {
      setEmailError("El correo debe tener el formato nombre.apellido@unah.hn");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.firstName,
          apellido: formData.lastName,
          correo: formData.email,
          matricula: formData.idNumber,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error en el registro");
      }

      setMensaje(
        "✅ Usuario registrado. Revisa tu correo para verificar tu cuenta."
      );
      setFormData({
        firstName: "",
        lastName: "",
        idNumber: "",
        email: "",
        password: "",
      });

      // Opcional: redirigir después de 4 segundos
      setTimeout(() => navigate("/verificar-pendiente"), 4000);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Ej. Juan"
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Ej. Pérez"
          />
        </div>
        <div>
          <label>Número de Identificación:</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
            placeholder="Ej. 20191002121"
          />
        </div>
        <div>
          <label>Correo Institucional:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="nombre.apellido@unah.hn"
          />
          {emailError && (
            <p style={{ color: "red", fontSize: "0.8em" }}>{emailError}</p>
          )}
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={!!emailError}>
          Registrarse
        </button>
      </form>
      {mensaje && <p style={{ marginTop: "1em" }}>{mensaje}</p>}
      <p>
        ¿Ya tienes cuenta? <Link to="/">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;

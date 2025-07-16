/* import { useState } from "react";
import { Link } from "react-router-dom";
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

export default Register; */

import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImage from "../image/Fondo4.jpg"; // Ruta a tu imagen de fondo

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
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error: " + error.message);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="card shadow p-4 w-100" style={{ maxWidth: "600px", backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
        <h2 className="text-center mb-4">Registrarse</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Ej. Juan"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Apellido:</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Ej. Pérez"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="idNumber" className="form-label">Número de Identificación:</label>
            <input
              type="text"
              className="form-control"
              name="idNumber"
              id="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
              placeholder="Ej. 20191002121"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Institucional:</label>
            <input
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="nombre.apellido@unah.hn"
            />
            {emailError && (
              <div className="invalid-feedback">{emailError}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success"
              disabled={!!emailError}
            >
              Registrarse
            </button>
          </div>
        </form>

        {mensaje && (
          <div className={`alert mt-3 ${mensaje.startsWith("✅") ? "alert-success" : "alert-danger"}`}>
            {mensaje}
          </div>
        )}

        <p className="mt-3 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/" className="text-decoration-none">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;


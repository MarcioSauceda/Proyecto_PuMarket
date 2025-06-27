import "./VerificarCorreo.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function VerificarCorreo() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [mensaje, setMensaje] = useState("Verificando...");
  const [mostrarReenvio, setMostrarReenvio] = useState(false);
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8080/api/verificar?token=${token}`)
        .then((res) => {
          if (!res.ok) throw new Error("TOKEN_EXPIRADO");
          return res.text();
        })
        .then((text) => setMensaje(text))
        .catch((err) => {
          if (err.message === "TOKEN_EXPIRADO") {
            setMensaje("El token ha expirado.");
            setMostrarReenvio(true);
          } else {
            setMensaje("Token inválido.");
          }
        });
    } else {
      setMensaje("No se encontró token en la URL");
    }
  }, [token]);

  const reenviarCorreo = () => {
    fetch("http://localhost:8080/api/reenviar-verificacion", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ correo }),
    })
      .then((res) => res.text())
      .then((text) => {
        setMensaje(text);
        setMostrarReenvio(false); // Oculta el formulario después de reenviar
      })
      .catch(() =>
        setMensaje("Ocurrió un error al reenviar el correo de verificación.")
      );
  };

  return (
    <div className="verificacion-container">
      <h2>Verificación de correo</h2>
      <p>{mensaje}</p>

      {mostrarReenvio && (
        <div style={{ marginTop: "1rem" }}>
          <label>Correo institucional:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="nombre.apellido@unah.hn"
            required
          />
          <button onClick={reenviarCorreo}>Reenviar verificación</button>
        </div>
      )}
    </div>
  );
}

export default VerificarCorreo;

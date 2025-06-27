import { useState } from "react";

function ReenviarVerificacion() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/reenviar-verificacion", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ correo }),
    })
      .then((res) => res.text())
      .then((text) => setMensaje(text))
      .catch((err) => setMensaje("Ocurrió un error."));
  };

  return (
    <div>
      <h2>Reenviar verificación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo institucional"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <button type="submit">Reenviar</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}

export default ReenviarVerificacion;

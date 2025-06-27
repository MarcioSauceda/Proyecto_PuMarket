import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import VerificarCorreo from "./components/VerificarCorreo";
import ReenviarVerificacion from "./components/ReenviarVerificacion";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verificar" element={<VerificarCorreo />} />
          <Route
            path="/reenviar-verificacion"
            element={<ReenviarVerificacion />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from './components/Profile';
import Messages from './components/Messages';
import VerificarCorreo from "./components/VerificarCorreo";
import ReenviarVerificacion from "./components/ReenviarVerificacion";
import SearchProducts from "./components/SearchProducts";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/verificar" element={<VerificarCorreo />} />
          <Route
            path="/reenviar-verificacion"
            element={<ReenviarVerificacion />}
          />
          <Route path="/buscar" element={<SearchProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

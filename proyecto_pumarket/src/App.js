import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from './components/Profile';
import Messages from './components/Messages';
import VerificarCorreo from "./components/VerificarCorreo";
import ReenviarVerificacion from "./components/ReenviarVerificacion";
import SearchProducts from "./components/SearchProducts";
import Reviews from "./components/Reviews";
import GiveReview from './components/GiveReview';
import ProductList from './components/ProductList';
import AdminReports from './components/AdminReports';
import ReportUser from './components/ReportUser';


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
          <Route path="/mis-reseñas" element={<Reviews />} />
          <Route path="/calificar" element={<GiveReview isSold={true} />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/admin-reportes" element={<AdminReports />} />
          <Route path="/reportar-usuario" element={<ReportUser reportedUser="usuario123@unah.hn" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

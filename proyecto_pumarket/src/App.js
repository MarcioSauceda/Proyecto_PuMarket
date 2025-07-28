import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddProductModal from "./components/AddProductModal";
import HistorialCompras from "./components/HistorialCompras";
import HistorialVentas from "./components/HistorialVentas";
import Messages from "./components/Messages";
import ProductDetailModal from "./components/ProductDetailModal";
import ProfileVendedor from "./components/ProfileVendedor";
import ReseñasPerfil from "./components/ReseñasPerfil";
import ReseñasPerfilVendedor from "./components/ReseñasPerfilVendedor";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoriaPage from "./pages/admin/Categoriapage";
import Usuariospage from "./pages/admin/Usuariospage";
import ReportesPage from "./pages/admin/Reportespage";
import Ventascompras from "./pages/admin/Ventascompras";
import Productosdisponibles from "./pages/admin/Productosdisponibles";
import Opcionespage from "./pages/admin/Opcionespage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/productdetailmodal" element={<ProductDetailModal />} />
          <Route path="/addproductmodal" element={<AddProductModal />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/historialventas" element={<HistorialVentas />} />
          <Route path="/historialcompras" element={<HistorialCompras />} />

          {/* Vendor profile routes */}
          <Route path="/profilevendedor" element={<ProfileVendedor />} />
          <Route path="/reseñasperfil" element={<ReseñasPerfil />} />
          <Route
            path="/reseñasperfilvendedor"
            element={<ReseñasPerfilVendedor />}
          />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/categorias" element={<CategoriaPage />} />
          <Route path="/admin/usuarios" element={<Usuariospage />} />
          <Route path="/admin/reportes" element={<ReportesPage />} />
          <Route
            path="/admin/reportes/ventas-compras"
            element={<Ventascompras />}
          />
          <Route
            path="/admin/reportes/productos-disponibles"
            element={<Productosdisponibles />}
          />
          <Route path="/admin/opciones" element={<Opcionespage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

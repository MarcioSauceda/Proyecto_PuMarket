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
import AdminDashboard from "./pages/admin/AdminDashboard";
/* import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; */
/* import Profile from './components/Profile';
import Messages from './components/Messages';
import VerificarCorreo from "./components/VerificarCorreo";
import ReenviarVerificacion from "./components/ReenviarVerificacion";
import SearchProducts from "./components/SearchProducts";
import Reviews from "./components/Reviews";
import GiveReview from './components/GiveReview';
import ProductList from './components/ProductList';
import AdminReports from './components/AdminReports';
import ReportUser from './components/ReportUser'; */

function App() {
  return (
    <AuthProvider>
      <Router>
        {/*  <div className="App"> */}
        <Routes>
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
          <Route path="/profilevendedor" element={<ProfileVendedor />} />
          <Route path="/reseñasperfil" element={<ReseñasPerfil />} />
          <Route
            path="/reseñasperfilvendedor"
            element={<ReseñasPerfilVendedor />}
          />
          <Route path="/admin" element={<AdminDashboard />} />

          {/*  <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<Profile />} />
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
          <Route
            path="/reportar-usuario"
            element={<ReportUser reportedUser="usuario123@unah.hn" />}
          /> */}
        </Routes>
        {/*   </div> */}
      </Router>
    </AuthProvider>
  );
}

export default App;

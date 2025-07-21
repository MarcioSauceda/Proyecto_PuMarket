import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProductDetailModal from "./ProductDetailModal";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productos/excluir-vendedor/${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al obtener productos");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
        setProducts([]);
      }
    };

    if (user?.id) {
      fetchProducts();
    }
  }, [user]);

  const filteredProducts = products.filter((product) =>
    [
      product.nombre,
      product.descripcion,
      product?.categoria?.nombre,
      product?.vendedor?.correoInstitucional,
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleMessageSeller = (email) => {
    navigate(`/messages/${email}`);
  };

  const handleViewSellerProfile = (email) => {
    navigate(`/profile/${email}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="dashboard bg-light min-vh-100 d-flex flex-column">
      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg navbar-dark px-4"
        style={{ backgroundColor: "#f2e423ff" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand">PuMarket</span>

          {/* Saludo al usuario */}
          <h2
            className="ms-3 mb-0"
            style={{
              color: "#2933c2ff",
              fontWeight: "600",
              fontSize: "1.5rem",
            }}
          >
            PuMarket - Bienvenido, {user.nombre} {user.apellido}
          </h2>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navItems"
            aria-controls="navItems"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navItems">
            <form className="d-flex ms-auto me-3" role="search">
              <input
                type="search"
                className="form-control me-2"
                placeholder="Buscar productos o vendedores..."
                aria-label="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item me-3">
                <Link
                  to="/profile"
                  className="btn btn-outline-light btn-sm"
                  style={{ backgroundColor: "#2933c2ff" }}
                >
                  Ver Perfil
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm text-white"
                  style={{ backgroundColor: "#FF5722" }}
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container my-4 flex-grow-1">
        <h4 className="mb-4 text-center">Productos disponibles</h4>
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={
                      product.imagenes && product.imagenes.length > 0
                        ? typeof product.imagenes[0] === "string"
                          ? product.imagenes[0]
                          : product.imagenes[0].urlImagen ||
                            "https://via.placeholder.com/300x200"
                        : "https://via.placeholder.com/300x200"
                    }
                    alt={product.nombre}
                    className="card-img-top"
                    style={{
                      cursor: "pointer",
                      height: "200px",
                      objectFit: "cover",
                      width: "100%",
                      borderTopLeftRadius: "0.375rem",
                      borderTopRightRadius: "0.375rem",
                    }}
                    onClick={() => handleViewProduct(product)}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.nombre}</h5>
                    <p className="card-text text-truncate">
                      <strong>Descripción:</strong> {product.descripcion}
                    </p>
                    <p className="card-text">
                      <strong>Precio:</strong> ${product.precio}
                    </p>
                    <p className="card-text">
                      <strong>Vendedor:</strong>{" "}
                      <span
                        className="text-primary text-decoration-underline"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleViewSellerProfile(
                            product.vendedor.correoInstitucional
                          )
                        }
                      >
                        {product.vendedor.correoInstitucional}
                      </span>
                    </p>
                    <div className="mt-auto d-grid gap-2">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleViewProduct(product)}
                      >
                        Ver Producto
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          handleMessageSeller(
                            product.vendedor.correoInstitucional
                          )
                        }
                      >
                        Enviar Mensaje
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No se encontraron productos.</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">
          © {new Date().getFullYear()} PuMarket | Todos los derechos reservados
        </p>
      </footer>

      {/* MODAL DETALLE */}
      {isDetailModalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isEditing={false}
          onClose={handleCloseModal}
          onEditProduct={() => {}}
        />
      )}
    </div>
  );
}

export default Dashboard;

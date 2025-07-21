import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddProductModal from "./AddProductModal";
import ProductDetailModal from "./ProductDetailModal";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [userProducts, setUserProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productos/vendedor/${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserProducts(data);
        } else {
          console.error("Error al obtener productos del usuario");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };
    if (user?.id && !loading) {
      fetchUserProducts();
    }
  }, [user, loading]);

  const handleAddProduct = async (newProduct) => {
    const payload = {
      producto: {
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion,
        precio: newProduct.precio,
        categoria: { id: newProduct.categoriaId },
        vendedor: { id: user.id },
      },
      imagenes: newProduct.imagenes,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/productos/con-imagenes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const created = await response.json();
        setUserProducts([...userProducts, created]);
      } else {
        const errorText = await response.text();
        console.error("Error al crear producto:", errorText);
      }
    } catch (error) {
      console.error("Error de conexión al crear producto:", error);
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      const res = await fetch(
        `http://localhost:8080/api/productos/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setUserProducts(userProducts.filter((p) => p.id !== productId));
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredProducts = userProducts.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.descripcion &&
        p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user) return null;

  return (
    <div className="profile bg-light min-vh-100 d-flex flex-column">
      {/* NAVBAR */}
      <nav
        className="navbar navbar-expand-lg navbar-dark px-4"
        style={{ backgroundColor: "#f2e423ff" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand">PuMarket</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navItems"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navItems">
            <form className="d-flex ms-auto me-3">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Buscar entre tus productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item me-3">
                <Link to="/dashboard" className="btn btn-outline-dark btn-sm">
                  Volver al Dashboard
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link to="/messages" className="btn btn-outline-dark btn-sm">
                  Mensajería
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="m-0">Mis productos publicados</h4>
          <button
            className="btn btn-success"
            onClick={() => setIsAddModalOpen(true)}
          >
            Agregar Producto
          </button>
        </div>

        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={
                      product.imagenes && product.imagenes.length > 0
                        ? product.imagenes[0].urlImagen || product.imagenes[0]
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
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDetailModalOpen(true);
                      setIsEditing(false);
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.nombre}</h5>
                    <p className="card-text text-truncate">
                      {product.descripcion}
                    </p>
                    <p className="card-text fw-bold">Lps. {product.precio}</p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDetailModalOpen(true);
                          setIsEditing(true);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No tienes productos publicados.</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">
          © {new Date().getFullYear()} PuMarket | Todos los derechos reservados
        </p>
      </footer>

      {/* MODALES */}
      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
        />
      )}

      {isDetailModalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isEditing={isEditing}
          onClose={() => setIsDetailModalOpen(false)}
          onEditProduct={() => {}}
        />
      )}
    </div>
  );
}

export default Profile;

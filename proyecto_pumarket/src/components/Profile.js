/* import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddProductModal from "./AddProductModal";
import ProductDetailModal from "./ProductDetailModal";
import "./Profile.css";

function Profile() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Redirección si no hay usuario
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  // Cargar productos del usuario
  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/productos/vendedor/${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("DEBUG: Productos del usuario:", data);
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

  // Crear producto con imágenes
  const handleAddProduct = async (newProduct) => {
    console.log("DEBUG: Producto recibido desde AddProductModal:", newProduct);

    const payload = {
      producto: {
        nombre: newProduct.nombre,
        descripcion: newProduct.descripcion,
        precio: newProduct.precio,
        categoria: { id: newProduct.categoriaId },
        vendedor: { id: user.id },
      },
      imagenes: newProduct.imagenes, // Array de URLs
    };

    console.log("DEBUG: Payload enviado al backend:", payload);

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
        console.log("DEBUG: Producto creado:", created);
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
        setUserProducts(
          userProducts.filter((product) => product.id !== productId)
        );
      }
    }
  };

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
    setIsEditing(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>
          Perfil de {user.nombre} {user.apellido}
        </h2>
        <div className="header-actions">
          <Link to="/dashboard" className="btn btn-dashboard">
            Volver al Dashboard
          </Link>
          <Link to="/messages" className="btn btn-messages">
            Mensajería
          </Link>
          <button onClick={handleLogout} className="btn btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="add-product">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-add-product"
        >
          Agregar Producto
        </button>
      </div>

      <div className="product-grid">
        {userProducts.length > 0 ? (
          userProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={
                    product.imagenes && product.imagenes.length > 0
                      ? product.imagenes[0].urlImagen || product.imagenes[0] // soporta array de objetos o de strings
                      : "https://via.placeholder.com/150"
                  }
                  alt={product.nombre}
                  className="product-image"
                  onClick={() => handleOpenDetail(product)}
                />
                <div className="product-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleOpenEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="product-info">
                <p className="product-description">{product.nombre}</p>
                <p className="product-price">Lps. {product.precio}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes productos publicados.</p>
        )}
      </div>

      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
        />
      )}

      {isDetailModalOpen && (
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

export default Profile; */

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddProductModal from "./AddProductModal";
import ProductDetailModal from "./ProductDetailModal";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/productos/vendedor/${user.id}`);
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

    if (user?.id) {
      fetchUserProducts();
    }
  }, [user]);

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: newProduct.nombre,
          descripcion: newProduct.descripcion,
          precio: newProduct.precio,
          categoria: { id: newProduct.categoriaId },
          vendedor: { id: user.id },
        }),
      });

      if (response.ok) {
        const created = await response.json();
        setUserProducts([...userProducts, created]);
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      const res = await fetch(`http://localhost:8080/api/productos/${productId}`, {
        method: "DELETE",
      });
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
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="profile bg-light min-vh-100 d-flex flex-column">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4" style={{ backgroundColor: "#f2e423ff" }}>
        <div className="container-fluid">
          <span className="navbar-brand">PuMarket</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navItems">
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
          <Link to="/dashboard" className="btn btn-outline-dark btn-sm">Volver al Dashboard</Link>
        </li>
        <li className="nav-item me-3">
          <Link to="/messages" className="btn btn-outline-dark btn-sm">Mensajería</Link>
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
            <div className="text-center mb-4">
              <button className="btn btn-success" onClick={() => setIsAddModalOpen(true)}>Agregar Producto</button>
            </div>
        </div>

        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={"https://via.placeholder.com/300x200"}
                    alt={product.nombre}
                    className="card-img-top"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDetailModalOpen(true);
                      setIsEditing(false);
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.nombre}</h5>
                    <p className="card-text text-truncate">{product.descripcion}</p>
                    <p className="card-text fw-bold">Lps. {product.precio}</p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button className="btn btn-outline-primary btn-sm" onClick={() => {
                        setSelectedProduct(product);
                        setIsDetailModalOpen(true);
                        setIsEditing(true);
                      }}>
                        Editar
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>
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
        <p className="mb-0">© {new Date().getFullYear()} PuMarket | Todos los derechos reservados</p>
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


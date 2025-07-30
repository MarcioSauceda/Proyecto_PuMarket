import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductDetailModal from "../components/ProductDetailModal";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  // Obtener productos desde el backend excluyendo al vendedor actual
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
    if (user?.id) fetchProducts();
  }, [user]);

  if (!user) {
    navigate("/");
    return null;
  }

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
    navigate(`/perfil-vendedor/${email}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ESTILOS EXTRAS */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .floating {
            animation: float 6s ease-in-out infinite;
          }
          .gradient-text {
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
          }
        `}
      </style>

      {/* NAVBAR FIJA */}
      <nav className="fixed top-0 w-full z-50 bg-primary text-white shadow">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-2xl font-semibold">Pu-Market</span>
          <div className="flex items-center space-x-4">
           {/* Botón desplegable con hover */}
<div className="relative group">
  <div
    className="w-38 h-10 text-white bg-primary rounded px-2 md:px-3 tracking-wider flex items-center justify-between py-2.5 px-6 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white font-semibold text-center shadow-xs transition-all duration-500 cursor-default"
  >
    Categorías ▼
  </div>

  {/* Menú desplegable visible solo con hover */}
  <div className="absolute mt-1 w-40 bg-white text-black rounded shadow-lg z-50 border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
    <ul className="py-1">
      <li className="px-4 py-2 hover:bg-gray-100 cursor-default">Mis Compras</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-default">Mis Ventas</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-default">Favoritos</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-default">Otras</li>
      <li className="px-4 py-2 hover:bg-gray-100 cursor-default">Nose</li>
    </ul>
  </div>
</div>

            {/* Buscador */}
            <input
              type="text"
              placeholder="Buscar productos, vendedores o categoría"
              aria-label="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 px-2 py-1 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
            />
            <Link
              to="/profile"
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
            >
              Ver Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 pt-5">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>

          <div className="container mx-auto px-6 py-24 relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Bienvenido/a PUMA,{" "}
                  <span className="gradient-text bg-gradient-to-r from-violet-500 to-yellow-400">
                    {user.nombre} {user.apellido}
                  </span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 max-w-lg text-justify">
                  ¡Bienvenido a Pu-Market! Sumérgete en una vibrante comunidad
                  universitaria donde puedes explorar productos únicos, comprar
                  lo que necesitas y vender tus artículos con facilidad.
                  Diseñado para estudiantes, por estudiantes, tu experiencia de
                  mercado comienza aquí. ¡Explora y conecta hoy mismo!
                </p>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500 rounded-full filter blur-3xl opacity-30"></div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-30"></div>
                  <img
                    src="https://infounah.wordpress.com/wp-content/uploads/2020/01/414239_473748775972236_468847150_o-2.jpg?w=837"
                    alt="Hero"
                    className="relative z-10 w-full floating"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent"></div>
        </section>

        {/* PRODUCTOS */}
        <div className="bg-gray-100 container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-6 text-textdark text-center">
            Productos Disponibles
          </h2>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col"
                >
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
                    className="w-full h-48 object-cover rounded cursor-pointer"
                    onClick={() => handleViewProduct(product)}
                  />
                  <h3 className="mt-4 text-lg font-semibold text-textdark">
                    {product.nombre}
                  </h3>
                  <p className="mt-2 text-sm text-textdark line-clamp-2">
                    {product.descripcion}
                  </p>
                  <p className="mt-2 text-textdark">
                    <strong>Precio:</strong> ${product.precio}
                  </p>
                  <p className="text-textdark">
                    <strong>Vendedor:</strong>{" "}
                    <span
                      className="text-primary hover:underline cursor-pointer"
                      onClick={() =>
                        handleViewSellerProfile(
                          product.vendedor.correoInstitucional
                        )
                      }
                    >
                      {product.vendedor.correoInstitucional}
                    </span>
                  </p>
                  <div className="mt-auto pt-4 flex space-x-2">
                    <button
                      onClick={() =>
                        handleMessageSeller(
                          product.vendedor.correoInstitucional
                        )
                      }
                      className="flex-1 px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
                    >
                      Enviar Mensaje
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-textdark">
              No se encontraron productos.
            </p>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-greylight py-4">
        <p className="text-center text-textdark text-sm">
          © {new Date().getFullYear()} Pu-Market | Todos los derechos reservados
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

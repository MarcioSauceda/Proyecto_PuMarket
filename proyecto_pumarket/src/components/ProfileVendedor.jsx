import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductDetailModal from "../components/ProductDetailModal";
import { useAuth } from "../context/AuthContext";

export default function ProfileVendedor() {
  const { correo } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vendedor, setVendedor] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Traer datos del vendedor y productos por correo
  useEffect(() => {
    const fetchVendedor = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/usuarios/correo/${correo}`
        );
        if (res.ok) {
          const data = await res.json();
          setVendedor(data);
        }
      } catch (error) {
        setVendedor(null);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/productos/vendedor-correo/${correo}`
        );
        if (res.ok) {
          const data = await res.json();
          setSellerProducts(data);
        }
      } catch (error) {
        setSellerProducts([]);
      }
    };

    if (correo) {
      fetchVendedor();
      fetchProducts();
    }
  }, [correo]);

  const filteredProducts = sellerProducts.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!vendedor) {
    return <p className="text-center mt-12">Cargando perfil del vendedor...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-primary text-white px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-xl font-semibold">
            Perfil de {vendedor.nombre} {vendedor.apellido}
          </span>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
            />
            <Link
              to="/dashboard"
              className="py-2.5 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-yellow-400 text-white cursor-pointer font-bold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-tr cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
            >
              Volver Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-textdark">
            Productos de {vendedor.nombre} 
          </h2>
          <div className="flex space-x-2">
            <Link
              to={`/verreseñasvendedor/${vendedor.correoInstitucional}`}
              className="p-2 text-black border border-greylight rounded-xl shadow-sm transition-all duration-100 bg-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-yellow-400 hover:text-white hover:shadow-md font-semibold"
            >
              Ver Reseñas
            </Link>
            <Link
              to={`/reseñasperfilvendedor/${vendedor.correoInstitucional}`}
              className="p-2 text-black border border-greylight rounded-xl shadow-sm transition-all duration-100 bg-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-yellow-400 hover:text-white hover:shadow-md font-semibold"
            >
              Dejar Reseña
            </Link>
          </div>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col transition-shadow bg-white border shadow-sm rounded-xl border-greylight hover:shadow-md"
              >
                {product.imagenes && product.imagenes.length > 1 ? (
  <Carousel
    showThumbs={false}
    showStatus={false}
    infiniteLoop
    className="rounded cursor-pointer"
    onClickItem={() => {
      setSelectedProduct(product);
      setIsDetailModalOpen(true);
    }}
  >
    {product.imagenes.map((img, index) => {
      const url =
        typeof img === "string"
          ? img
          : img.urlImagen || "https://via.placeholder.com/300x200";
      return (
        <div key={index}>
          <img
            src={url}
            alt={`${product.nombre} ${index + 1}`}
            className="w-full h-48 object-cover rounded"
          />
        </div>
      );
    })}
  </Carousel>
) : (
  <img
    src={
      product.imagenes && product.imagenes.length > 0
        ? typeof product.imagenes[0] === "string"
          ? product.imagenes[0]
          : product.imagenes[0].urlImagen || "https://via.placeholder.com/300x200"
        : "https://via.placeholder.com/300x200"
    }
    alt={product.nombre}
    className="w-full h-48 object-cover rounded cursor-pointer"
    onClick={() => {
      setSelectedProduct(product);
      setIsDetailModalOpen(true);
    }}
  />
)}
                <div className="mt-4 flex-1 space-y-2">
                  <p className="text-textdark font-medium">{product.nombre}</p>
                  <p className="text-textdark text-sm line-clamp-2">
                    {product.descripcion}
                  </p>
                  <p className="text-textdark font-semibold">
                    L. {product.precio}
                  </p>
                </div>
                {/* Botón para enviar mensaje (solo si NO es el vendedor logueado) */}
                <div className="mt-4 flex">
                  {user &&
                    vendedor.correoInstitucional !==
                      user.correoInstitucional && (
                      <button
                        onClick={() =>
                          navigate(
                            `/messages/${vendedor.correoInstitucional}?productoId=${product.id}&compradorId=${user.id}`
                          )
                        }
                        className="flex-1 px-3 py-1 bg-accent text-textdark rounded hover:opacity-90"
                      >
                        Enviar Mensaje
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-textdark">
            No tiene productos disponibles.
          </p>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-greylight py-4">
        <p className="text-center text-textdark text-sm">
          © {new Date().getFullYear()} Pu-Market | Todos los derechos reservados
        </p>
      </footer>

      {/* MODAL DE DETALLE */}
      {isDetailModalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isEditing={false}
          onClose={() => setIsDetailModalOpen(false)}
          onEditProduct={() => {}}
        />
      )}
    </div>
  );
}

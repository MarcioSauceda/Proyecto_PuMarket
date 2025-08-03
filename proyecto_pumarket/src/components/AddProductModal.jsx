import { useEffect, useState } from "react";

export default function AddProductModal({
  onClose,
  onAddProduct,
  isEditing = false,
  productToEdit = null,
  onEditProduct,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoriaId: "",
    estadoDelProducto: "",
    images: [],
  });
  const [categorias, setCategorias] = useState([]);
  const [estadosProducto, setEstadosProducto] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // Llenar los datos si editas
  useEffect(() => {
    if (isEditing && productToEdit) {
      setFormData({
        nombre: productToEdit.nombre || "",
        descripcion: productToEdit.descripcion || "",
        precio: productToEdit.precio || "",
        categoriaId: productToEdit.categoria?.id || "",
        estadoDelProducto: productToEdit.estadoDelProducto?.id || "",
        images: [], // Solo para nuevas imágenes
      });
      if (productToEdit.imagenes && Array.isArray(productToEdit.imagenes)) {
        setImagePreviews(
          productToEdit.imagenes.map((img) =>
            typeof img === "string" ? img : img.urlImagen
          )
        );
        setImageCount(productToEdit.imagenes.length);
      } else {
        setImagePreviews([]);
        setImageCount(0);
      }
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        categoriaId: "",
        estadoDelProducto: "",
        images: [],
      });
      setImagePreviews([]);
      setImageCount(0);
    }
  }, [isEditing, productToEdit]);

  useEffect(() => {
    // Cargar categorías
    fetch("http://localhost:8080/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => {
        console.error("Error al cargar categorías", err);
        setCategorias([]);
      });

    // Cargar estados del producto
    fetch("http://localhost:8080/api/estadoproducto")
      .then((res) => res.json())
      .then((data) => setEstadosProducto(data))
      .catch((err) => {
        console.error("Error al cargar estados del producto", err);
        setEstadosProducto([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageCount > 10) {
      setError("No puedes subir más de 10 imágenes.");
      return;
    }
    if (files.length === 0) {
      setError("Debes subir al menos 1 imagen.");
      return;
    }
    setError("");
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setImageCount((prev) => prev + files.length);
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
    setImageCount((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombre,
      descripcion,
      precio,
      categoriaId,
      estadoDelProducto,
      images,
    } = formData;

    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !categoriaId ||
      !estadoDelProducto ||
      (!isEditing && images.length === 0)
    ) {
      setError("Completa todos los campos y sube al menos una imagen.");
      return;
    }
    if (isNaN(precio) || parseFloat(precio) <= 0) {
      setError("El precio debe ser un número positivo.");
      return;
    }
    if (!user || !user.id) {
      setError("Usuario no autenticado.");
      return;
    }

    try {
      setLoading(true);
      const urlsImagenes = [];

      for (const imgFile of images) {
        const formDataImagen = new FormData();
        formDataImagen.append("imagen", imgFile);

        const res = await fetch("http://localhost:8080/api/imagenes", {
          method: "POST",
          body: formDataImagen,
        });

        if (res.ok) {
          const url = await res.text();
          urlsImagenes.push(url);
        } else {
          setError("Error al subir imagen.");
          setLoading(false);
          return;
        }
      }

      // Objeto que se enviará al backend
      const dto = {
        producto: {
          id: isEditing && productToEdit?.id ? productToEdit.id : undefined,
          nombre,
          descripcion,
          precio: parseFloat(precio),
          categoria: { id: parseInt(categoriaId) },
          vendedor: { id: user.id },
          estadoDelProducto: { id: parseInt(estadoDelProducto) },
        },
        imagenes: urlsImagenes,
      };

      if (isEditing) {
        // En edición: PUT o función de edición
        await onEditProduct({
          ...dto.producto,
          categoriaId: dto.producto.categoria.id,
          estadoDelProducto: dto.producto.estadoDelProducto,
        });
        onClose();
      } else {
        // En creación: POST
        const response = await fetch(
          "http://localhost:8080/api/productos/con-imagenes",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dto),
          }
        );
        if (response.ok) {
          const nuevo = await response.json();
          onAddProduct(nuevo);
          onClose();
          window.location.reload(); // Reload the page after successful save
        } else {
          const texto = await response.text();
          console.error("Error al guardar:", texto);
          setError("Error al guardar el producto.");
        }
      }
    } catch (error) {
      console.error("Error de red:", error);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg max-w-md w-full max-h-[80vh] flex flex-col overflow-hidden"
      >
        <h2 className="text-xl font-semibold text-textdark px-6 pt-6">
          {isEditing ? "Editar Producto" : "Agregar Nuevo Producto"}
        </h2>
        {error && <p className="text-red-600 text-sm px-6">{error}</p>}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-textdark">
              Título:
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-textdark">
              Categoría:
            </label>
            <select
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Selecciona una categoría --</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-textdark">
              Estado:
            </label>
            <select
              name="estadoDelProducto"
              value={formData.estadoDelProducto}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Selecciona un estado --</option>
              {estadosProducto.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-textdark">
              Descripción:
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              className="w-full h-24 px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-textdark">
              Precio (Lps):
            </label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {!isEditing && (
            <div>
              <label className="block text-sm font-medium mb-1 text-textdark">
                Imágenes (1 a 10):
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div className="flex space-x-2 overflow-x-auto mt-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Vista previa ${index + 1}`}
                      className="w-24 h-24 object-cover rounded cursor-pointer border-2 border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 p-1 bg-accent text-textdark rounded hover:opacity-90"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2 px-6 pb-1 border-t border-greylight bg-white sticky bottom-5 z-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 top-10"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-accent text-textdark rounded hover:opacity-90"
          >
            {loading
              ? "Guardando..."
              : isEditing
              ? "Guardar cambios"
              : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
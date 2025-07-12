import { useState, useEffect } from "react";
import "./AddProductModal.css";

function AddProductModal({ onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoriaId: "",
    condition: "Nuevo",
    images: [],
  });
  const [categorias, setCategorias] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // Cargar categorías desde el backend
    fetch("http://localhost:8080/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => {
        console.error("Error al cargar categorías", err);
        setCategorias([]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, descripcion, precio, categoriaId, images } = formData;

    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !categoriaId ||
      images.length === 0
    ) {
      setError("Completa todos los campos y sube al menos una imagen.");
      return;
    }

    if (isNaN(precio) || parseFloat(precio) <= 0) {
      setError("El precio debe ser un número positivo.");
      return;
    }

    const nuevoProducto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoriaId: parseInt(categoriaId),
      // Por ahora enviamos las imágenes como vista previa (mock)
      imagenes: imagePreviews,
    };

    onAddProduct(nuevoProducto); // el componente padre lo adapta al formato final
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Nuevo Producto</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div>
              <label>Título:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Categoría:</label>
              <select
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                required
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
              <label>Estado:</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>
            <div>
              <label>Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Precio (Lps):</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
            <div>
              <label>Imágenes (1 a 10):</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Vista previa ${index + 1}`} />
                    <button
                      type="button"
                      className="btn btn-remove-image"
                      onClick={() => removeImage(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-save">
              Guardar
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;

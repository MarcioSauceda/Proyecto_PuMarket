import { useState } from 'react';
import './AddProductModal.css';

function AddProductModal({ onClose, onAddProduct }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electrónica',
    condition: 'Nuevo',
    description: '',
    price: '',
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageCount > 10) {
      setError('No puedes subir más de 10 imágenes.');
      return;
    }
    if (imageCount + files.length < 1) {
      setError('Debes subir al menos 1 imagen.');
      return;
    }
    setError('');
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newImages]);
    setFormData({ ...formData, images: [...formData.images, ...files] });
    setImageCount(imageCount + files.length);
  };

  const removeImage = (index) => {
    if (imageCount > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      const newPreviews = imagePreviews.filter((_, i) => i !== index);
      setFormData({ ...formData, images: newImages });
      setImagePreviews(newPreviews);
      setImageCount(imageCount - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price || formData.images.length < 1) {
      setError('Por favor, completa todos los campos obligatorios, incluyendo al menos una imagen.');
      return;
    }
    if (isNaN(formData.price) || formData.price <= 0) {
      setError('El precio debe ser un número positivo.');
      return;
    }
    // Simular URLs para las imágenes (en el backend, subirás los archivos)
    const imageUrls = imagePreviews;
    onAddProduct({ ...formData, images: imageUrls });
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
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Categoría:</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Electrónica">Electrónica</option>
                <option value="Muebles">Muebles</option>
                <option value="Libros">Libros</option>
                <option value="Ropa">Ropa</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            <div>
              <label>Estado:</label>
              <select name="condition" value={formData.condition} onChange={handleChange}>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>
            <div>
              <label>Descripción:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Precio ($):</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label>Imágenes (mínimo 1, máximo 10):</label>
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
                    {imageCount > 1 && (
                      <button
                        type="button"
                        className="btn btn-remove-image"
                        onClick={() => removeImage(index)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-save">Guardar</button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
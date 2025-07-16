import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTrash, FaSave, FaTimes } from 'react-icons/fa'; // Importar íconos
import './ProductDetailModal.css';
import GiveReview from './GiveReview';

function ProductDetailModal({ product, isEditing, onClose, onEditProduct }) {
  const [formData, setFormData] = useState({
    title: product.title,
    category: product.category,
    condition: product.condition,
    description: product.description,
    price: product.price,
    status: product.status,
    images: product.images,
  });
  const [imagePreviews, setImagePreviews] = useState(product.images);
  const [imageCount, setImageCount] = useState(product.images.length);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(product.images[0] || 'https://via.placeholder.com/300'); // Imagen seleccionada

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
      if (imagePreviews[index] === selectedImage) {
        setSelectedImage(newPreviews[0] || 'https://via.placeholder.com/300');
      }
    } else {
      setError('Debes mantener al menos 1 imagen.');
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleNextImage = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    setSelectedImage(product.images[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    setSelectedImage(product.images[prevIndex]);
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
    const imageUrls = imagePreviews;
    onEditProduct({ ...formData, id: product.id, images: imageUrls });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isEditing ? (
          <>
            <h2>Editar Producto</h2>
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
                  <label>Precio (Lps. ):</label>
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
                  <label>Estado de la publicación:</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Disponible">Disponible</option>
                    <option value="Vendido">Vendido</option>
                    <option value="Agotado">Agotado</option>
                  </select>
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
                          > <FaTrash />
                            Eliminar
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-save"><FaSave />Guardar</button>
                <button type="button" className="btn btn-cancel" onClick={onClose}><FaTimes />Cancelar</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2>{product.title}</h2>
            <div className="product-details">
              <div className="image-section">
                <div className="main-image-container">
                  <button type="button" className="btn btn-arrow btn-prev" onClick={handlePrevImage}>
                    <FaArrowLeft />
                  </button>
                  <img src={selectedImage} alt={product.title} className="main-image" />
                  <button type="button" className="btn btn-arrow btn-next" onClick={handleNextImage}>
                    <FaArrowRight />
                  </button>
                </div>
                <div className="image-thumbnails">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Miniatura ${index + 1}`}
                      className={`thumbnail ${selectedImage === image ? 'selected' : ''}`}
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
                </div>
              </div>
              <div className="info-section">
                <p><strong>Categoría:</strong> {product.category}</p>
                <p><strong>Estado:</strong> {product.condition}</p>
                <p><strong>Descripción:</strong> {product.description}</p>
                <p><strong>Precio:</strong> Lps. {product.price}</p>
                <p><strong>Estado de la publicación:</strong> {product.status}</p>
                {product.status === 'Vendido' && <GiveReview isSold={true} />}-------------------------
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn-cancel" onClick={onClose}>Cerrar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetailModal; 


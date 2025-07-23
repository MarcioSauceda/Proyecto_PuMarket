import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";

export default function ProductDetailModal({
  product,
  isEditing,
  onClose,
  onEditProduct,
}) {
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
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    product.images[0] || "https://via.placeholder.com/300"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageCount > 10) {
      setError("No puedes subir más de 10 imágenes.");
      return;
    }
    if (imageCount + files.length < 1) {
      setError("Debes subir al menos 1 imagen.");
      return;
    }
    setError("");
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
        setSelectedImage(newPreviews[0] || "https://via.placeholder.com/300");
      }
    } else {
      setError("Debes mantener al menos 1 imagen.");
    }
  };

  const handleImageClick = (image) => setSelectedImage(image);
  const handleNextImage = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    setSelectedImage(product.images[nextIndex]);
  };
  const handlePrevImage = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const prevIndex =
      (currentIndex - 1 + product.images.length) % product.images.length;
    setSelectedImage(product.images[prevIndex]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      formData.images.length < 1
    ) {
      setError(
        "Por favor, completa todos los campos obligatorios, incluyendo al menos una imagen."
      );
      return;
    }
    if (isNaN(formData.price) || formData.price <= 0) {
      setError("El precio debe ser un número positivo.");
      return;
    }
    onEditProduct({ ...formData, id: product.id, images: imagePreviews });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col overflow-hidden">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-4 text-textdark px-6 pt-6">
              Editar Producto
            </h2>
            {error && <p className="text-red-600 text-sm px-6">{error}</p>}
            <div className="flex flex-1 overflow-y-auto px-6 py-4 space-x-6">
              <div className="flex-1 flex flex-col space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-textdark">
                    Título:
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
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
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Electrónica</option>
                    <option>Muebles</option>
                    <option>Libros</option>
                    <option>Ropa</option>
                    <option>Otros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-textdark">
                    Estado:
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Nuevo</option>
                    <option>Usado</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-textdark">
                    Descripción:
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full h-full px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-textdark">
                    Precio (Lps.):
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-textdark">
                    Estado de la publicación:
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-greylight rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Disponible</option>
                    <option>Vendido</option>
                    <option>Agotado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-textdark">
                    Imágenes (1-10):
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block"
                  />
                  <div className="flex space-x-2 overflow-x-auto mt-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-24 h-24 object-cover rounded cursor-pointer border-2 ` +
                          (selectedImage === preview ? 'border-primary' : 'border-transparent') +
                          `"
                          onClick={() => handleImageClick(preview)}
                        />
                        {imageCount > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 p-1 rounded bg-accent text-textdark hover:opacity-90"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-4 px-6 pb-6 border-t border-greylight">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-accent text-textdark rounded hover:opacity-90"
              >
                <FaSave className="mr-2" /> Guardar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center px-4 py-2 bg-primary text-white rounded hover:opacity-90"
              >
                <FaTimes className="mr-2" /> Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-4 text-textdark px-6 pt-6">
              {product.title}
            </h2>
            <div className="flex flex-1 overflow-y-auto px-6 py-4 space-x-6">
              <div className="flex-2 flex flex-col space-y-4">
                <div className="relative flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-2 bg-accent bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 text-white"
                  >
                    <FaArrowLeft />
                  </button>
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full max-h-80 object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-2 bg-accent bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 text-white"
                  >
                    <FaArrowRight />
                  </button>
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`thumbnail ${idx + 1}`}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                        selectedImage === img
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                      onClick={() => handleImageClick(img)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col space-y-2 text-textdark">
                <p>
                  <strong>Categoría:</strong> {product.category}
                </p>
                <p>
                  <strong>Estado:</strong> {product.condition}
                </p>
                <p>
                  <strong>Descripción:</strong> {product.description}
                </p>
                <p>
                  <strong>Precio:</strong> Lps. {product.price}
                </p>
                <p>
                  <strong>Estado de la publicación:</strong> {product.status}
                </p>
              </div>
            </div>
            <div className="flex justify-end px-6 pb-6 border-t border-greylight">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

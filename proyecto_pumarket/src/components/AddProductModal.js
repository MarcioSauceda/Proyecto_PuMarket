import { useState } from 'react';
import './AddProductModal.css';

function AddProductModal({ onClose, onAddProduct }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Electrónica',
        condition: 'Nuevo',
        description: '',
        price: ''
    });

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que los campos no estén vacíos
    if (!formData.title || !formData.description || !formData.price) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    // Validar que el precio sea un número positivo
    if (isNaN(formData.price) || formData.price <= 0) {
        alert('El precio debe ser un número positivo.');
        return;
    }
    onAddProduct(formData);
};

return (
    <div className="modal-overlay">
        <div className="modal-content">
        <h2>Agregar Nuevo Producto</h2>
        <form onSubmit={handleSubmit}>
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
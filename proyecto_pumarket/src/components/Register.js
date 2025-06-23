import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

function Register() {
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    password: ''
});
const [emailError, setEmailError] = useState('');
const navigate = useNavigate();
const { login } = useAuth();

  // Expresión regular para validar correo institucional (nombre.apellido@unah.hn)
const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@unah\.hn$/;

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validar correo en tiempo real
    if (name === 'email') {
    if (!emailRegex.test(value)) {
        setEmailError('El correo debe tener el formato nombre.apellido@unah.hn');
    } else {
        setEmailError('');
    }
    }
};

const handleRegister = (e) => {
    e.preventDefault();

    // Validar el correo antes de proceder
    if (!emailRegex.test(formData.email)) {
        setEmailError('El correo debe tener el formato nombre.apellido@unah.hn');
    return;
    }

    // Aquí iría la lógica de registro (conexión a un backend)
    console.log('Register attempt:', formData);
    // Simulación de registro exitoso
    login(formData.email); // Actualizamos el contexto con el email
    navigate('/dashboard');
};

return (
    <div className="register-container">
    <h2>Registrarse</h2>
    <form onSubmit={handleRegister}>
        <div>
        <label>Nombre:</label>
        <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder='Ej. Juan'
        />
        </div>
        <div>
        <label>Apellido:</label>
        <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder='Ej. Perez'
        />
        </div>
        <div>
        <label>Número de Identificación:</label>
        <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
            placeholder='20191002121'
        />
        </div>
        <div>
        <label>Correo Institucional:</label>
        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='nombre.apellido@unah.hn'
        />
        {emailError && <p style={{ color: 'red', fontSize: '0.8em' }}>{emailError}</p>}
        </div>
        <div>
        <label>Contraseña:</label>
        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
        />
        </div>
        <button type="submit" disabled={!!emailError}>
        Registrarse
        </button>
    </form>
    <p>
        ¿Ya tienes cuenta? <Link to="/">Inicia sesión aquí</Link>
    </p>
    </div>
);
}

export default Register;
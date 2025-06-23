import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const { login } = useAuth();

const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de autenticación
    login(email);
    navigate('/dashboard');
};

return (
    <div className="login-container">
    <h2>Iniciar Sesión</h2>
    <form onSubmit={handleLogin}>
        <div>
        <label>Email:</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='nombre.apellido@unah.hn'
        />
        </div>
        <div>
        <label>Contraseña:</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </div>
        <button type="submit">Iniciar Sesión</button>
    </form>
    <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
    </p>
    </div>
);
}

export default Login;
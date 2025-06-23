import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
const { user, logout } = useAuth();
const navigate = useNavigate();

if (!user) {
    navigate('/');
    return null;
}

return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>Bienvenido, {user.email}</h2>
    <p>¡Has iniciado sesión con éxito!</p>
    <button onClick={logout}>Cerrar Sesión</button>
    </div>
);
}

export default Dashboard;
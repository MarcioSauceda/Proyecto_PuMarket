import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Messages.css';

function Messages() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="messages-container">
      <h2>Mensajería</h2>
      <p>Funcionalidad de mensajería en desarrollo. ¡Pronto podrás enviar y recibir mensajes!</p>
      <button onClick={() => navigate('/profile')} className="btn btn-back">
        Volver al Perfil
      </button>
    </div>
  );
}

export default Messages;
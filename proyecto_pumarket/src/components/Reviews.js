import React, { useState } from 'react';
import './Reviews.css';
import { useAuth } from '../context/AuthContext';

const Reviews = () => {
  const { user } = useAuth();

  //Simulación de rol (en proyecto real viene del backend)
  const isSeller = user?.email?.includes("unah.hn");

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, rating: 5, comment: "Excelente vendedor, entrega rápida." },
    { id: 2, rating: 4, comment: "Buen servicio, aunque llegó un poco tarde." },
    { id: 3, rating: 3, comment: "Regular, producto no era como esperaba." },
  ]);

  const promedio = (
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
  ).toFixed(1);

  const handleSubmit = () => {
    if (rating > 0 && comment.trim() !== '') {
      const newReview = {
        id: reviews.length + 1,
        rating,
        comment,
      };
      setReviews([newReview, ...reviews]);
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="reviews-container">
      <h2>Mi reputación: {promedio}/5</h2>

      <div className="legend">
        <p><strong>Leyenda de estrellas:</strong></p>
        <ul>
          <li>⭐ Muy malo</li>
          <li>⭐⭐ Malo</li>
          <li>⭐⭐⭐ Regular</li>
          <li>⭐⭐⭐⭐ Muy bueno</li>
          <li>⭐⭐⭐⭐⭐ Excelente</li>
        </ul>
      </div>

      {!isSeller && (
        <div className="rating-section">
          <p>Califica al vendedor:</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${(hovered || rating) >= star ? 'filled' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Escribe un comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleSubmit}>Enviar Reseña</button>
        </div>
      )}

      <div className="review-list">
        <h3>Reseñas Recibidas:</h3>
        {reviews.map((r) => (
          <div key={r.id} className="review-card">
            <div className="stars-readonly">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={`star ${r.rating >= s ? 'filled' : ''}`}>
                  ★
                </span>
              ))}
            </div>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;

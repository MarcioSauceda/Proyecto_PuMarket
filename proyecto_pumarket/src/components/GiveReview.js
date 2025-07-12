import React, { useState } from 'react';
import './GiveReview.css';

const GiveReview = ({ isSold }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0 && comment.trim() !== '') {
      setSubmitted(true);
    }
  };

  if (!isSold) return null; //CAC - Ashly

  return (
    <div className="give-review-container">
      <h3>Calificar compra</h3>
      {!submitted ? (
        <>
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
            placeholder="Escribe tu comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleSubmit}>Enviar Reseña</button>
        </>
      ) : (
        <p className="success-message">¡Gracias por tu reseña!</p>
      )}
    </div>
  );
};

export default GiveReview;


import { useState } from 'react';
import { Star } from '../../../assets/icons';
import './RatingStars.scss';

export function RatingStars({ numberOfStars = 5 }) {
  const [rating, setRating] = useState(0);

  function handleChange(r) {
    setRating((prev) => {
      if (r === prev) return 0;
      return r;
    });
  }

  return (
    <div className={`rating-stars ${rating > 0 ? 'active' : ''}`}>
      {Array(numberOfStars)
        .fill(0)
        .map((_, index) => (
          <Star
            className={`${rating === index + 1 ? 'active' : ''}`}
            onClick={() => handleChange(index + 1)}
          />
        ))}
    </div>
  );
}

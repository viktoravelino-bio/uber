import { useState } from 'react';
import { Star } from '../../../assets/icons';
import './RatingStars.scss';

export function RatingStars({
  initialRating = 0,
  numberOfStars = 5,
  onClick = () => {},
  readOnly = false,
}) {
  const [rating, setRating] = useState(initialRating);

  function handleChange(r) {
    if (readOnly) return;
    setRating((prev) => {
      if (r === prev) return 0;
      return r;
    });
    onClick(r);
  }

  return (
    <div
      className={`rating-stars ${readOnly ? 'readOnly' : ''} ${
        rating > 0 ? 'active' : ''
      }`}
    >
      {Array(numberOfStars)
        .fill(0)
        .map((_, index) => (
          <Star
            key={index}
            className={`${rating === index + 1 ? 'active' : ''}`}
            onClick={() => handleChange(index + 1)}
          />
        ))}
    </div>
  );
}

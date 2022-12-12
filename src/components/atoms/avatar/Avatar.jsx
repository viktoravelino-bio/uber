import { Star } from '../../../assets/icons';
import { getComponentSize } from '../../../lib/utils/getComponentSize';
import './Avatar.scss';

export function Avatar({ rating, size = 24, height, width, ...props }) {
  return (
    <div {...props} className="avatar">
      <img
        src="https://picsum.photos/200/300"
        alt="avatar"
        {...getComponentSize({ height, size, width })}
      />
      {rating && (
        <div className="rating">
          <span>{Number(rating).toFixed(2)}</span>

          <Star height={size / 5} width={size / 5} />
        </div>
      )}
    </div>
  );
}

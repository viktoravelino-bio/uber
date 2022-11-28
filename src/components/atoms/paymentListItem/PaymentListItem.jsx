import { AddIcon, CheckIcon } from '../../../assets/icons';
import { usePayment } from '../../../context/PaymentContext';

const IMAGE_MAP = {
  visa: 'https://d3i4yxtzktqr9n.cloudfront.net/web-payments-experience/c57afa92c9773650.svg',
  mastercard:
    'https://d3i4yxtzktqr9n.cloudfront.net/web-payments-experience/2c03f0a00a6e70e3.svg',
};

export function PaymentListItem({
  nickName = '',
  lastFour,
  type = 'new',
  isSelected = false,
  onClick = () => {},
}) {
  return (
    <button className="payment-modal__list-item" onClick={onClick}>
      <div className="payment-modal__list-item__icon-container">
        {type === 'new' && <AddIcon />}

        {type !== 'new' && <img src={IMAGE_MAP[type]} alt="" />}
      </div>
      <div className="payment-modal__list-item__label-container">
        <p>
          {type === 'new' && 'Add payment method'}
          {type !== 'new' &&
            `${type[0].toUpperCase()}${type.slice(1)} - ${lastFour} ${
              nickName && `(${nickName})`
            }`}
        </p>
        {isSelected && <CheckIcon />}
      </div>
    </button>
  );
}

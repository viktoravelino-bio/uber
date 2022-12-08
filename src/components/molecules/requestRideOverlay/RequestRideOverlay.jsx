import './RequestRideOverlay.scss';

import { Button } from '../../atoms/button/Button';
import { ChevronRightIcon } from '../../../assets/icons';
import { usePayment } from '../../../context/PaymentContext';
import { uppercaseFirstLetter } from '../../../lib/utils/uppercaseFirstLetter';

const IMAGE_MAP = {
  visa: 'https://d3i4yxtzktqr9n.cloudfront.net/web-payments-experience/c57afa92c9773650.svg',
  mastercard:
    'https://d3i4yxtzktqr9n.cloudfront.net/web-payments-experience/2c03f0a00a6e70e3.svg',
};

export function RequestRideOverlay({
  onOpenPaymentModal = () => {},
  onConfirmRide = () => {},
  ...props
}) {
  const { selectedPaymentOption } = usePayment();
  const { type, lastFour, nickName } = selectedPaymentOption;
  return (
    <>
      <div className="request-ride-overlay" {...props}>
        <button className="payment-type-selection" onClick={onOpenPaymentModal}>
          <img src={IMAGE_MAP[type]} alt="" />
          <p>
            {uppercaseFirstLetter(type)} ••••{lastFour} • Personal
          </p>
          <ChevronRightIcon />
        </button>
        <Button onClick={onConfirmRide}>Request UberX</Button>
      </div>
    </>
  );
}

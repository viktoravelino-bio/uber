import {
  AddIcon,
  BusinessIcon,
  CheckIcon,
  PersonIcon,
} from '../../../assets/icons';
import { usePayment } from '../../../context/PaymentContext';
import { BottomModal } from '../../atoms/bottomModal/BottomModal';
import { Button } from '../../atoms/button/Button';
import { ChipButton } from '../../atoms/chipButton/ChipButton';
import { PaymentListItem } from '../../atoms/paymentListItem/PaymentListItem';
import './PaymentModal.scss';

export function PaymentModal({ onClose, visible }) {
  const { paymentOptions, selectedPaymentOption, handleSelectPaymentOption } =
    usePayment();

  return (
    <BottomModal onClose={onClose} visible={visible}>
      <div className="payment-modal">
        <div className="payment-modal__header">
          <h2 className="payment-modal__header__title">Payment options</h2>

          <div>
            <ChipButton leftIcon={PersonIcon}>Personal</ChipButton>
            <ChipButton leftIcon={BusinessIcon}>Business</ChipButton>
          </div>
        </div>

        <div className="payment-modal__list">
          {paymentOptions.map((paymentOption) => (
            <PaymentListItem
              key={paymentOption.id}
              {...paymentOption}
              isSelected={paymentOption.id === selectedPaymentOption.id}
              onClick={() => handleSelectPaymentOption(paymentOption.id)}
            />
          ))}
          <PaymentListItem type="new" />
        </div>
        <div className="bottom-overlay">
          <Button onClick={onClose}>Save</Button>
        </div>
      </div>
    </BottomModal>
  );
}

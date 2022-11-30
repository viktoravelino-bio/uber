import { useContext } from 'react';
import {
  AddIcon,
  BusinessIcon,
  CheckIcon,
  PersonIcon,
} from '../../../assets/icons';
import { Button } from '../../atoms/button/Button';
import { ChipButton } from '../../atoms/chipButton/ChipButton';
import { SelectionListItem } from '../../atoms/selectionListItem/SelectionListItem';
import data from '../../../assets/data/data.json';
import { usePayment } from '../../../context/PaymentContext';
import { uppercaseFirstLetter } from '../../../lib/utils/uppercaseFirstLetter';
export function PaymentSelection({ context }) {
  const { paymentOptions, selectedPaymentOption, handleSelectPaymentOption } =
    usePayment();
  const { images_url } = data;
  const { onClose, setTab } = useContext(context);

  return (
    <div className="payment-modal">
      <div className="payment-modal__header">
        <ChipButton leftIcon={PersonIcon}>Personal</ChipButton>
        <ChipButton leftIcon={BusinessIcon}>Business</ChipButton>
      </div>

      <div className="payment-modal__list">
        {paymentOptions.map((paymentOption) => (
          <SelectionListItem
            key={paymentOption.id}
            image={images_url[paymentOption.type]}
            label={`${uppercaseFirstLetter(paymentOption.type)} - ${
              paymentOption.lastFour
            } ${paymentOption.nickName ? `(${paymentOption.nickName})` : ''}`}
            rightIcon={
              paymentOption.id === selectedPaymentOption.id && CheckIcon
            }
            onClick={() => handleSelectPaymentOption(paymentOption.id)}
          />
        ))}

        <SelectionListItem
          onClick={() => setTab('payment-methods')}
          leftIcon={AddIcon}
          label="Add payment method"
        />
      </div>

      <div className="payment-modal__footer">
        <Button onClick={onClose}>Save</Button>
      </div>
    </div>
  );
}

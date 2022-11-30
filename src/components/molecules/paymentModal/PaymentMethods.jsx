import { useContext } from 'react';
import {
  AddIcon,
  BusinessIcon,
  CheckIcon,
  ChevronRightIcon,
  PersonIcon,
} from '../../../assets/icons';
import { Button } from '../../atoms/button/Button';
import { ChipButton } from '../../atoms/chipButton/ChipButton';
import { SelectionListItem } from '../../atoms/selectionListItem/SelectionListItem';
import data from '../../../assets/data/data.json';
import { usePayment } from '../../../context/PaymentContext';
import { uppercaseFirstLetter } from '../../../lib/utils/uppercaseFirstLetter';

export function PaymentMethods({ context }) {
  const { paymentOptions, selectedPaymentOption, handleSelectPaymentOption } =
    usePayment();
  const { images_url } = data;
  const { onClose, setTab } = useContext(context);

  return (
    <div className="payment-modal">
      <div className="payment-modal__list">
        <SelectionListItem
          onClick={() => setTab('add-card')}
          image={images_url['generic-card']}
          rightIcon={() => (
            <ChevronRightIcon color="#afafaf" height={20} width={20} />
          )}
          label="Credit or debit card"
        />
        <SelectionListItem
          onClick={() => console.log('Navigate to gift card')}
          image={images_url['user-square']}
          rightIcon={() => (
            <ChevronRightIcon color="#afafaf" height={20} width={20} />
          )}
          label="Gift Card"
        />
        <SelectionListItem
          onClick={() => console.log('Navigate to paypal')}
          image={images_url['pay-pal']}
          rightIcon={() => (
            <ChevronRightIcon color="#afafaf" height={20} width={20} />
          )}
          label="PayPal"
        />
      </div>

      <div className="payment-modal__footer">
        <Button onClick={() => setTab('payment-selection')}>Go Back</Button>
      </div>
    </div>
  );
}

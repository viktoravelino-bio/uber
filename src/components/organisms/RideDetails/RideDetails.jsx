import {
  MapPin,
  User,
  UserIcon,
  ArrowsLeftRight,
  Screencast,
} from '../../../assets/icons';
import { usePayment } from '../../../context/PaymentContext';
import { useRideContext } from '../../../context/RideContext';
import { uppercaseFirstLetter } from '../../../lib/utils/uppercaseFirstLetter';
import './RideDetails.scss';

export function RideDetailListItem({
  icon: Icon,
  label,
  actionLabel,
  onAction = () => console.log('action: ', actionLabel),
}) {
  return (
    <div className="ride-detail-list-item" onClick={onAction}>
      <Icon height={20} width={20} />
      <span>{label}</span>
      <span>{actionLabel}</span>
    </div>
  );
}

export function RideDetails() {
  const { ride } = useRideContext();
  const { selectedPaymentOption } = usePayment();
  const {
    destination: { address },
  } = ride;
  const { type, lastFour, nickName } = selectedPaymentOption;

  return (
    <div>
      <RideDetailListItem
        icon={MapPin}
        label={address}
        actionLabel="Add or change"
      />
      <RideDetailListItem
        icon={UserIcon}
        label={uppercaseFirstLetter(type) + ' - ' + lastFour}
        actionLabel="Switch"
      />
      <RideDetailListItem
        icon={ArrowsLeftRight}
        label="Riding with someone?"
        actionLabel="Split fare"
      />
      <RideDetailListItem
        icon={Screencast}
        label="Share trip status"
        actionLabel="Share"
      />
    </div>
  );
}

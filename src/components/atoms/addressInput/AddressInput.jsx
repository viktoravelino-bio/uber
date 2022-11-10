import { forwardRef, memo } from 'react';
import { DestinationInputIcon, PickupInputIcon } from '../../../assets/icons';
import './AddressInput.scss';

function Input({ type = 'pickup', ...props }) {
  return (
    <div className="address-input__input">
      <div>
        {type === 'pickup' ? <PickupInputIcon /> : <DestinationInputIcon />}
      </div>
      <input {...props} type="text" className="address-input__input" />
    </div>
  );
}

function AddressInputRoot({
  pickupValue,
  onChangePickup = () => {},
  destinationValue,
  onChangeDestination = () => {},
  onFocusPickup = () => {},
  onFocusDestination = () => {},
}) {
  return (
    <div className="address-input__container">
      <Input
        placeholder="Add a pickup location"
        value={pickupValue}
        onChange={(e) => onChangePickup(e.target.value)}
        onFocus={onFocusPickup}
      />
      <Input
        placeholder="Enter your destination"
        type="destination"
        value={destinationValue}
        onChange={(e) => onChangeDestination(e.target.value)}
        onFocus={onFocusDestination}
      />
      <div className="address-input__vertical-line" />
    </div>
  );
}

export const AddressInput = memo(AddressInputRoot);

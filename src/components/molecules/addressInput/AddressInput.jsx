import { forwardRef, useEffect, useState } from 'react';
import { DestinationInputIcon, PickupInputIcon } from '../../../assets/icons';
import { useRideContext } from '../../../context/RideContext';
import './AddressInput.scss';

const Input = forwardRef(({ type = 'pickup', isFocused, ...props }, ref) => {
  return (
    <div className={`address-input__input ${isFocused ? 'active' : ''}`}>
      <div>
        {type === 'pickup' ? <PickupInputIcon /> : <DestinationInputIcon />}
      </div>
      <input
        {...props}
        type="text"
        className="address-input__input"
        ref={ref}
      />
    </div>
  );
});

export function AddressInput({ onFocus }) {
  const { ride, handleChange, setType, type } = useRideContext();
  const [originValue, setOriginValue] = useState(ride?.origin.address || '');
  const [destinationValue, setDestinationValue] = useState(
    ride?.origin.address || ''
  );

  async function handleInternalChange(e) {
    if (e.target.name === 'origin') {
      setOriginValue(e.target.value);
    } else if (e.target.name === 'destination') {
      setDestinationValue(e.target.value);
    }

    handleChange(e);
  }

  function handleFocus(e) {
    setType(e.target.name);
    handleInternalChange(e);
    onFocus(e);
  }

  useEffect(() => {
    setOriginValue(ride?.origin.address);
    setDestinationValue(ride?.destination.address);
  }, [ride]);

  return (
    <div className="address-input__container">
      <Input
        isFocused={type === 'origin'}
        name="origin"
        placeholder="Add a pickup location"
        onFocus={handleFocus}
        onChange={handleInternalChange}
        value={originValue}
      />

      <Input
        isFocused={type === 'destination'}
        name="destination"
        placeholder="Enter your destination"
        type="destination"
        onFocus={handleFocus}
        onChange={handleInternalChange}
        value={destinationValue}
      />
      <div className="address-input__vertical-line" />
    </div>
  );
}

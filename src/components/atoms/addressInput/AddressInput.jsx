import { useEffect, useMemo, useState } from 'react';
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

function AddressInputRoot({ onPlacesChanged, values }) {
  const [type, setType] = useState('origin');
  const [originValue, setOriginValue] = useState(values.origin.address || '');
  const [destinationValue, setDestinationValue] = useState(
    values.destination.address || ''
  );

  const AutocompleteService = useMemo(
    () => new window.google.maps.places.AutocompleteService(),
    []
  );

  async function handleChange(e) {
    if (e.target.name === 'origin') {
      setOriginValue(e.target.value);
    } else if (e.target.name === 'destination') {
      setDestinationValue(e.target.value);
    }

    if (e.target.value === '') return;
    const { predictions } = await AutocompleteService.getPlacePredictions({
      input: e.target.value,
      region: 'ca',
    });

    onPlacesChanged({ type, predictions });
  }

  function handleFocus(e) {
    setType(e.target.name);

    if (e.target.value === '') {
      onPlacesChanged([]);
    } else {
      handleChange(e);
    }
  }

  useEffect(() => {
    setOriginValue(values.origin.address);
    setDestinationValue(values.destination.address);
  }, [values]);

  return (
    <div className="address-input__container">
      <Input
        name="origin"
        placeholder="Add a pickup location"
        value={originValue}
        onFocus={handleFocus}
        onChange={(e) => handleChange(e)}
      />

      <Input
        name="destination"
        placeholder="Enter your destination"
        type="destination"
        onFocus={handleFocus}
        value={destinationValue}
        onChange={(e) => handleChange(e)}
      />
      <div className="address-input__vertical-line" />
    </div>
  );
}

export const AddressInput = AddressInputRoot;

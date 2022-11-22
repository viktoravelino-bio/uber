import { ChevronDownIcon, ClockIcon } from '../assets/icons';
import { ChipButton } from '../components/atoms/chipButton/ChipButton';
import data from '../assets/data/data.json';
import { RideType } from '../components/atoms/rideType/RideType';
import { useState } from 'react';

export function RideSelection() {
  const { rideTypes } = data;
  const rideTypeArray = Object.entries(rideTypes);
  const [selectedRideTypeKey, setSelectedRideTypeKey] = useState('');
  const [showExtraInfo, setShowExtraInfo] = useState(false);

  function handleRideTypeClick(key) {
    if (selectedRideTypeKey === key) {
      return setShowExtraInfo(true);
    }

    setSelectedRideTypeKey(key);
  }

  return (
    <div style={{ paddingInline: '1rem' }}>
      <ChipButton
        style={{ marginBlock: '1rem' }}
        leftIcon={ClockIcon}
        rightIcon={ChevronDownIcon}
      >
        Leave Now
      </ChipButton>

      {!showExtraInfo && (
        <div>
          {rideTypeArray.map(([key, rideType]) => (
            <RideType
              key={key}
              rideType={rideType}
              onClick={() => handleRideTypeClick(key)}
              isSelected={key === selectedRideTypeKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

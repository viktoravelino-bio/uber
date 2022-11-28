import { ChevronDownIcon, ClockIcon } from '../assets/icons';
import { ChipButton } from '../components/atoms/chipButton/ChipButton';
import data from '../assets/data/data.json';
import { RideType } from '../components/atoms/rideType/RideType';
import { useState } from 'react';
import { RequestRideOverlay } from '../components/molecules/requestRideOverlay/RequestRideOverlay';
import { RideExtraInfo } from '../components/molecules/rideExtraInfo/RideExtraInfo';
import { PaymentModal } from '../components/molecules/paymentModal/PaymentModal';

export function RideSelection() {
  const { rideTypes } = data;
  const rideTypeArray = Object.entries(rideTypes);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const [selectedRideTypeKey, setSelectedRideTypeKey] = useState(
    rideTypeArray[0][0]
  );

  const selectedRide = rideTypes[selectedRideTypeKey];

  function handleRideTypeClick(key) {
    if (selectedRideTypeKey === key) {
      return setShowExtraInfo(true);
    }

    setSelectedRideTypeKey(key);
  }

  return (
    <div style={{ paddingBottom: '8rem' }}>
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

        {showExtraInfo && (
          <RideExtraInfo
            rideType={selectedRide}
            onClose={() => setShowExtraInfo(false)}
          />
        )}
      </div>

      <RequestRideOverlay
        onOpenPaymentModal={() => setShowPaymentModal(true)}
      />

      <PaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </div>
  );
}

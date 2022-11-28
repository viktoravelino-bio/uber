import { CloseIcon } from '../../../assets/icons';
import { useRideContext } from '../../../context/RideContext';
import { IconButton } from '../../atoms/iconButton/IconButton';
import { PriceDetailItem } from './PriceDetailItem';
import './RideExtraInfo.scss';
export function RideExtraInfo({ rideType, onClose = () => {} }) {
  const { ride } = useRideContext();
  const {
    matrix: { distance, duration },
  } = ride;
  const { displayName, priceDetails, passengerCount, description } = rideType;
  const {
    base,
    costPerDistance,
    costPerMinute,
    bookingFee,
    surcharge,
    minimum,
    waitingTime,
  } = priceDetails;

  function calculatePrice() {
    const HST = 0.13;

    const price =
      base +
      costPerDistance * (distance / 1000) +
      costPerMinute * (duration / 60) +
      surcharge +
      bookingFee;

    const finalPriceBeforeTax = price < minimum ? minimum : price;
    const tax = finalPriceBeforeTax * HST;
    const finalPrice = finalPriceBeforeTax + tax;

    return finalPrice.toFixed(2);
  }

  function calculateETA() {
    const currentTime = new Date().getTime();
    const etaTime = new Date(currentTime + duration * 1000);
    const etaFormatted = etaTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return etaFormatted;
  }

  return (
    <div className="ride-extra-info">
      <div className="ride-extra-info__header">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <div className="ride-extra-info__header__title">
          <h6>{displayName}</h6>
          <h6>CA${calculatePrice()}</h6>
        </div>
        <p>In 6 mins. {calculateETA()} dropoff</p>
        <p>
          {passengerCount} Seats. {description}
        </p>
      </div>
      <div className="ride-extra-info__body">
        <p>
          Your fare will be the price presented before the trip or based on the
          rates below and other applicable surcharges and adjustments.
        </p>

        <PriceDetailItem label="Base Fare" price={base} />
        <PriceDetailItem label="Minimum Fare" price={minimum} />
        <PriceDetailItem label="+ Per Minute" price={costPerMinute} />
        <PriceDetailItem label="+ Per Kilometer" price={costPerDistance} />
        <PriceDetailItem label="Estimated Surcharges" price={surcharge} />
        <PriceDetailItem label="Booking Fee" price={bookingFee} />
        <p>
          Additional wait time charges may apply to your trip if the driver has
          waited 2 minute(s): CA${waitingTime.toFixed(2)} per minute
        </p>
      </div>
    </div>
  );
}

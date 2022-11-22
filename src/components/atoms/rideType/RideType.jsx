import { PersonIcon } from '../../../assets/icons';
import { useRideContext } from '../../../context/RideContext';
import './RideType.scss';

export function RideType({ rideType, onClick, isSelected }) {
  const { ride } = useRideContext();
  const {
    matrix: { distance, duration },
  } = ride;

  const { image, displayName, passengerCount, description, priceDetails } =
    rideType;

  function calculateETA() {
    const currentTime = new Date().getTime();
    const etaTime = new Date(currentTime + duration * 1000);
    const etaFormatted = etaTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return etaFormatted;
  }

  function calculatePrice() {
    const HST = 0.13;
    const {
      base,
      costPerDistance,
      costPerMinute,
      bookingFee,
      surcharge,
      minimum,
    } = priceDetails;

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

  return (
    <div
      className={`ride-type__container`}
      onClick={onClick}
      data-selected={isSelected ? true : false}
    >
      <div className="ride-type__img">
        <img src={image} alt={displayName} />
      </div>
      <div className="ride-type__info">
        <div className="ride-type__info__header">
          <div>
            <p className="name">{displayName}</p>
            {isSelected && (
              <>
                <PersonIcon />
                <p className="count">{passengerCount}</p>
              </>
            )}
          </div>
          <div>
            <p className="price">CA${calculatePrice()}</p>
          </div>
        </div>
        <div className="ride-type__info__description">
          <p>{description}</p>
        </div>
        <div className="ride-type__info__eta">
          <p>
            {isSelected && 'in 3 mins.'} {calculateETA()} dropoff
          </p>
        </div>
      </div>
    </div>
  );
}

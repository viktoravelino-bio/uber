import { Avatar } from '../../atoms/avatar/Avatar';
import './DriverInfo.scss';

export function DriverInfo({
  licensePlate,
  carName,
  driverName,
  tripNumber,
  carImg,
}) {
  return (
    <div>
      <div className="driver-car-info">
        <div className="driver-car-info__images-container">
          <Avatar size={50} rating="5" />
          <img src={carImg} alt="" height={60} />
        </div>

        <span className="driver-car-info__license-plate">{licensePlate}</span>
        <span className="driver-car-info__car-name">{carName}</span>
      </div>

      <div className="driver-info">
        <span className="driver-info__driver-name">{driverName}</span>
        <span>•</span>
        <span className="driver-info__trip-number">{tripNumber} trips</span>
      </div>
    </div>
  );
}

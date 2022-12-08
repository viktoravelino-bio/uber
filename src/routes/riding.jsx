import { Avatar } from '../components/atoms/avatar/Avatar';
import { Button } from '../components/atoms/button/Button';
import { DriverInfo } from '../components/molecules/driverInfo/DriverInfo';
import { RideDetails } from '../components/organisms/RideDetails/RideDetails';
import car from '../assets/images/car.png';
export function Riding() {
  return (
    <div>
      <DriverInfo
        licensePlate="DU596IR"
        carName="Tucson"
        driverName="Ante"
        tripNumber="4,052"
        carImg={car}
      />

      <RideDetails />

      <Button
        variant="ghost"
        style={{ color: 'red' }}
        onClick={() => console.log('cancel ride')}
      >
        Cancel
      </Button>
    </div>
  );
}

import { Button } from '../components/atoms/button/Button';
import { DriverInfo } from '../components/molecules/driverInfo/DriverInfo';
import { RideDetails } from '../components/organisms/RideDetails/RideDetails';
import car from '../assets/images/car.png';
import { Actions } from '../components/molecules/actions/Actions';
import { Modal } from '../components/atoms/modal/Modal';
import { Avatar } from '../components/atoms/avatar/Avatar';
import { useState } from 'react';
import { RatingStars } from '../components/molecules/RatingStars/RatingStars';
import { useNavigate } from 'react-router-dom';

export function Riding() {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <DriverInfo
        licensePlate="DU596IR"
        carName="Tucson"
        driverName="Ante"
        tripNumber="4,052"
        carImg={car}
      />

      <Actions />

      <RideDetails />

      <Button
        variant="ghost"
        style={{ color: 'red' }}
        onClick={() => console.log('cancel ride')}
      >
        Cancel
      </Button>
      <Button variant="ghost" onClick={() => setShowRatingModal(true)}>
        End Ride
      </Button>

      <Modal
        visible={showRatingModal}
        onRequestClose={() => setShowRatingModal(false)}
        showSkipButton
      >
        <Avatar size={60} style={{ marginInline: 'auto' }} />

        <h1
          style={{
            textAlign: 'center',
            marginBlock: '1rem',
          }}
        >
          Rate you trip and thank Ante with a tip
        </h1>

        <RatingStars
          onClick={(r) => {
            navigate(`/tipping/${r}`);
          }}
        />
      </Modal>
    </div>
  );
}

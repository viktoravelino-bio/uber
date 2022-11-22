import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRideContext } from '../../context/RideContext';
import { Header } from '../molecules/header/Header';
import { Map } from '../organisms/map/Map';

import './mapView.scss';

export function MapView() {
  const { ride } = useRideContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!ride.origin.location || !ride.destination.location) {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="map__container">
        <Map />
      </div>

      <div className="bottom-sheet">
        <div className="bottom-sheet__content-container">
          <div className="bottom-sheet__container">
            <div className="bottom-sheet__handle" />
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

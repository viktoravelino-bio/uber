import { Outlet } from 'react-router-dom';
import { Header } from '../molecules/header/Header';
import { Map } from '../organisms/map/Map';

import './mapView.scss';

export function MapView() {
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

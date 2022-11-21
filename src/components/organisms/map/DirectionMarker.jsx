import { OverlayView } from '@react-google-maps/api';
import './DirectionMarker.scss';

export function DirectionMarker({ type = 'origin', location, address }) {
  return (
    <OverlayView
      position={location}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -(height / 1),
      })}
    >
      <div
        className="direction-marker"
        data-type-destination={type === 'destination'}
      >
        <span onClick={() => console.log('hi')}>
          {type === 'origin' ? 'From' : 'To'} {address.split(',')[0]}
        </span>
      </div>
    </OverlayView>
  );
}

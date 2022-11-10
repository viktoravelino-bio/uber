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

// <Marker
//   position={position}
//   icon={{
//     // url:
//     //   type === 'origin'
//     //     ? 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fpaomedia%2Fsmall-n-flat%2F1024%2Fmap-marker-icon.png&f=1&nofb=1&ipt=097fff67e0522b66fdcc213a5ba23198e0733fdbd350e17029737a5af5503ed4&ipo=images'
//     //     : '/images/destination.png',
//     scaledSize: new window.google.maps.Size(40, 40),
//     origin: new window.google.maps.Point(10, 10),
//     // anchor: new window.google.maps.Point(20, 20),
//   }}
// />

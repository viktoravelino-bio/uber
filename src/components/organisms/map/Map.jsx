import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';
import { useLocation } from '../../../context/LocationContext';
import { useRideContext } from '../../../context/RideContext';
import { DirectionMarker } from './DirectionMarker';
import { mapStyle } from './mapStyle';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 43.727899,
  lng: -79.4212276,
};

export function Map({ extraMarkers = [] }) {
  const { currentLocation } = useLocation();
  const { ride } = useRideContext();

  const origin = ride?.origin;
  const destination = ride?.destination;

  const [directionsResponse, setDirectionsResponse] = useState(null);

  const directionsCallback = useCallback((res) => {
    if (res !== null) {
      if (res.status === 'OK') {
        setDirectionsResponse(res);
      } else {
        console.log('response: ', res);
      }
    }
  }, []);

  const directionsServiceOptions = useMemo(() => {
    return {
      destination: destination?.location,
      origin: origin?.location,
      travelMode: 'DRIVING',
    };
  }, [destination, origin]);

  const directionResponseOptions = useMemo(() => {
    return {
      directions: directionsResponse,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: 'black',
      },
    };
  }, [directionsResponse]);

  const directionMarkersPosition = useMemo(() => {
    return {
      origin: {
        location: origin?.location,
        address: origin?.address?.split(',')[0],
      },
      destination: {
        location: destination?.location,
        address: destination?.address?.split(',')[0],
      },
    };
  }, [destination, origin]);

  return (
    //   <div
    //   style={{
    //     height: 'calc(100vh/2)',
    //     position: 'fixed',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     pointerEvents: 'auto',
    //   }}
    // >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation || center}
      zoom={currentLocation ? 15 : 10}
      options={{
        styles: mapStyle,
        disableDefaultUI: true,
      }}
    >
      {currentLocation && <Marker position={currentLocation} />}

      {origin?.location && destination?.location && (
        <DirectionsService
          options={directionsServiceOptions}
          callback={directionsCallback}
        />
      )}

      {directionsResponse !== null && (
        <DirectionsRenderer options={directionResponseOptions} />
      )}

      {origin?.location && (
        <DirectionMarker {...directionMarkersPosition.origin} type="origin" />
      )}

      {destination?.location && (
        <DirectionMarker
          {...directionMarkersPosition.destination}
          type="destination"
        />
      )}

      {extraMarkers?.map((marker, i) => (
        <Marker key={i} position={marker} />
      ))}
    </GoogleMap>
  );
}

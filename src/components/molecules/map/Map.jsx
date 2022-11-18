import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';
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

export function Map({ origin, destination, extraMarkers = [] }) {
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
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={{
        styles: mapStyle,
        disableDefaultUI: true,
      }}
    >
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

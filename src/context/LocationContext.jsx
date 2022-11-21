import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LocationContext = createContext({});

export function LocationProvider({ children }) {
  const [currentLocation, setLocation] = useState(null);
  const [currentAddress, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  const Gecoder = useMemo(() => new window.google.maps.Geocoder(), []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (!currentLocation) return;
    async function load() {
      const { results } = await Gecoder.geocode({
        location: currentLocation,
      });

      setAddress(results[0].formatted_address.split(',')[0]);
      setLoading(false);
    }
    load();
  }, [currentLocation]);

  return (
    <LocationContext.Provider
      value={{ currentLocation, currentAddress, loading }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}

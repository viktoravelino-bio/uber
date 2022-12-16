import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RideContext = createContext({});

export function RideProvider({ children }) {
  const [type, setType] = useState('origin');
  const [showFullScreen, setShowFullScreen] = useState(false);
  const navigate = useNavigate();
  const [searchedItems, setSearchedItems] = useState({
    type: 'origin',
    predictions: [],
  });

  const [ride, setRide] = useState({
    origin: {
      location: '',
      address: '',
    },
    destination: {
      location: '',
      address: '',
    },
    matrix: {
      distance: null,
      duration: null,
    },
  });

  function reset() {
    setRide({
      origin: {
        location: '',
        address: '',
      },
      destination: {
        location: '',
        address: '',
      },
      matrix: {
        distance: null,
        duration: null,
      },
    });
  }

  const AutocompleteService = useMemo(
    () => new window.google.maps.places.AutocompleteService(),
    []
  );

  const DistanceMatrix = useMemo(
    () => new window.google.maps.DistanceMatrixService(),
    []
  );

  const Gecoder = useMemo(() => new window.google.maps.Geocoder(), []);

  async function handleChange(value) {
    if (value === '') return;
    const { predictions } = await AutocompleteService.getPlacePredictions({
      input: value,
      region: 'ca',
    });

    setSearchedItems({ type, predictions });
  }

  async function handleChangePlace(place_id) {
    const { results } = await Gecoder.geocode({
      placeId: place_id,
    });

    setRide((prev) => {
      return {
        ...prev,
        [type]: {
          location: results[0].geometry.location,
          address: results[0].formatted_address.split(',')[0],
        },
      };
    });

    setType((prev) => (prev === 'origin' ? 'destination' : 'origin'));
  }

  useEffect(() => {
    setSearchedItems({ type, predictions: [] });
  }, [type]);

  useEffect(() => {
    if (ride.origin.address && ride.destination.address) {
      setShowFullScreen(false);
      navigate('/ride-selection');
      setSearchedItems({ type, predictions: [] });
    }
  }, [ride]);

  useEffect(() => {
    async function getDistance() {
      if (!ride.origin.location || !ride.destination.location) return;

      const test = await DistanceMatrix.getDistanceMatrix({
        origins: [ride.origin.location],
        destinations: [ride.destination.location],
        travelMode: 'DRIVING',
      });

      const distance = test.rows[0].elements[0].distance.value;
      const duration = test.rows[0].elements[0].duration.value;

      setRide((prev) => ({ ...prev, matrix: { distance, duration } }));
    }
    getDistance();
  }, [ride.origin, ride.destination]);

  return (
    <RideContext.Provider
      value={{
        searchedItems,
        handleChangePlace,
        ride,
        handleChange,
        setType,
        type,
        showFullScreen,
        setShowFullScreen,
        reset,
      }}
    >
      {children}
    </RideContext.Provider>
  );
}

export function useRideContext() {
  return useContext(RideContext);
}

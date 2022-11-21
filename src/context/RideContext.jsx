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
  });

  const AutocompleteService = useMemo(
    () => new window.google.maps.places.AutocompleteService(),
    []
  );

  const Gecoder = useMemo(() => new window.google.maps.Geocoder(), []);

  async function handleChange(e) {
    if (e.target.value === '') return;
    const { predictions } = await AutocompleteService.getPlacePredictions({
      input: e.target.value,
      region: 'ca',
    });

    setSearchedItems({ type, predictions });
  }

  async function handleChangePlace(prediction) {
    const { results } = await Gecoder.geocode({
      placeId: prediction.place_id,
    });

    setRide((prev) => {
      return {
        ...prev,
        [type]: {
          location: results[0].geometry.location,
          address: prediction.structured_formatting.main_text,
        },
      };
    });
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
      }}
    >
      {children}
    </RideContext.Provider>
  );
}

export function useRideContext() {
  return useContext(RideContext);
}

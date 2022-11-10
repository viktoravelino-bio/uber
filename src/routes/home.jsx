import { useEffect, useMemo, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { AddressInput } from '../components/atoms/addressInput/AddressInput';

import { Map } from '../components/molecules/map/Map';

export function Home() {
  const [selectedInput, setSelectedInput] = useState('pickup');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState([]);

  const [directions, setDirections] = useState({});

  const autoCompleteService = useMemo(
    () => new window.google.maps.places.AutocompleteService(),
    []
  );
  const geocoder = useMemo(() => new window.google.maps.Geocoder(), []);

  async function handleSelectPrediction(predictionSelected) {
    const { place_id } = predictionSelected;

    const { results } = await geocoder.geocode({
      placeId: place_id,
    });

    if (selectedInput === 'pickup') {
      setDirections((prev) => ({
        ...prev,
        origin: {
          location: results[0].geometry.location,
          address: results[0].formatted_address,
        },
      }));
    } else if (selectedInput === 'destination') {
      setDirections((prev) => ({
        ...prev,
        destination: {
          location: results[0].geometry.location,
          address: results[0].formatted_address,
        },
      }));
    }
  }

  useEffect(() => {
    async function getDirections() {
      if (selectedInput === 'pickup' && !pickup) {
        return setPredictions([]);
      }
      if (selectedInput === 'destination' && !destination) {
        return setPredictions([]);
      }

      const { predictions: res } =
        await autoCompleteService.getPlacePredictions({
          input: selectedInput === 'pickup' ? pickup : destination,
        });

      setPredictions(res);
    }

    getDirections();
  }, [pickup, destination, selectedInput]);

  return (
    <>
      <div style={{ height: 'calc(100vh/2)' }}>
        <Map {...directions} />
      </div>

      <BottomSheet
        open={true}
        blocking={false}
        defaultSnap={({ maxHeight }) => maxHeight / 2}
        snapPoints={({ maxHeight }) => [maxHeight / 2, maxHeight]}
        expandOnContentDrag={true}
      >
        <div style={{ backgroundColor: 'white', margin: '1rem' }}>
          <AddressInput
            pickupValue={pickup}
            destinationValue={destination}
            onChangeDestination={(value) => setDestination(value)}
            onChangePickup={(value) => setPickup(value)}
            onFocusPickup={() => {
              if (!pickup) {
                setPredictions([]);
              }
              setSelectedInput('pickup');
            }}
            onFocusDestination={() => {
              if (!destination) {
                setPredictions([]);
              }
              setSelectedInput('destination');
            }}
          />

          {predictions?.map((prediction, i) => {
            const street = prediction.description.split(',')[0];
            return (
              <div key={i} onClick={() => handleSelectPrediction(prediction)}>
                <p>{street}</p>
              </div>
            );
          })}
        </div>
      </BottomSheet>
    </>
  );
}

{
  /* <button
onClick={() =>
  setDirections({
    origin: '33 orchard view blvd',
    destination: '100 eglinton',
  })
}
>
HI
</button> */
}

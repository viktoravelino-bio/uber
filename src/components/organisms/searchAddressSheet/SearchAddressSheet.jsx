import { useMemo, useState } from 'react';
import { ChevronDownIcon, ClockIcon } from '../../../assets/icons';
import { AddressInput } from '../../atoms/addressInput/AddressInput';
import { BottomSheet } from '../../atoms/bottomSheet/BottomSheet';
import { ChipButton } from '../../atoms/chipButton/ChipButton';
import { SearchAddressItem } from '../../atoms/searchAddressItem/SearchAddressItem';

export function SearchAddressSheet({ directions, setDirections, ...props }) {
  const [places, setPlaces] = useState([]);

  const Geocoder = useMemo(() => new window.google.maps.Geocoder(), []);

  async function handlePlaceClick(place_id) {
    const { results } = await Geocoder.geocode({ placeId: place_id });
    const { geometry, formatted_address } = results[0];
    setDirections((prev) => ({
      ...prev,
      [places.type]: {
        location: geometry.location,
        address: formatted_address.split(',')[0],
      },
    }));
  }

  return (
    <BottomSheet>
      <div style={{ backgroundColor: 'white', margin: '1rem' }}>
        <AddressInput onPlacesChanged={setPlaces} values={directions} />

        <ChipButton
          style={{ marginBlock: '1.5rem' }}
          leftIcon={ClockIcon}
          rightIcon={ChevronDownIcon}
        >
          Leave now
        </ChipButton>
      </div>

      {!places?.predictions?.length > 0 && (
        <>
          <SearchAddressItem
            name="Fetching..."
            description="Your current location"
            type="current-location"
          />
          <SearchAddressItem name="Set location on map" type="map-location" />
        </>
      )}

      {places?.predictions?.map((prediction, i) => {
        return (
          <SearchAddressItem
            key={prediction.reference}
            prediction={prediction}
          />
        );
      })}
    </BottomSheet>
  );
}

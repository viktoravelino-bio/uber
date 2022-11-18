import { useState } from 'react';
import { Map } from '../components/molecules/map/Map';
import { SearchAddressSheet } from '../components/organisms/searchAddressSheet/SearchAddressSheet';

export function Home() {
  const [directions, setDirections] = useState({
    origin: {
      place_id: '',
      address: '',
    },
    destination: {
      place_id: '',
      address: '',
    },
  });

  return (
    <>
      <div style={{ height: 'calc(100vh/2)' }}>
        <Map {...directions} />
      </div>

      <SearchAddressSheet
        directions={directions}
        setDirections={setDirections}
      />
    </>
  );
}

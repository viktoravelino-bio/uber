import { useState } from 'react';
import { ChevronDownIcon, ClockIcon } from '../assets/icons';
import { AddressInput } from '../components/molecules/addressInput/AddressInput';
import { ChipButton } from '../components/atoms/chipButton/ChipButton';
import { SearchAddressItem } from '../components/atoms/searchAddressItem/SearchAddressItem';
import { useLocation } from '../context/LocationContext';
import { useRideContext } from '../context/RideContext';

export function Looking() {
  const {
    searchedItems,
    handleChangePlace,
    showFullScreen,
    setShowFullScreen,
  } = useRideContext();
  const { currentAddress, loading } = useLocation();

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: showFullScreen ? '100vh' : 'auto',
        width: showFullScreen ? '100vw' : 'auto',
        position: showFullScreen ? 'fixed' : 'unset',
        top: 0,
        left: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '0rem',
      }}
    >
      {showFullScreen && (
        <header style={{ padding: '1rem' }}>
          <ChevronDownIcon
            onClick={() => setShowFullScreen(false)}
            height={20}
            width={20}
            style={{ cursor: 'pointer' }}
          />
        </header>
      )}

      <div style={{ paddingInline: '1rem' }}>
        <AddressInput
          onFocus={() => setShowFullScreen(true)}
          onDestinationFocus={() => setShowFullScreen(true)}
        />
        <ChipButton
          style={{ marginBlock: '1rem' }}
          leftIcon={ClockIcon}
          rightIcon={ChevronDownIcon}
        >
          Leave Now
        </ChipButton>
      </div>

      <div className="place-list">
        {!searchedItems.predictions.length && (
          <>
            <SearchAddressItem
              name={loading ? 'Fetching...' : currentAddress}
              type="current-location"
              description="Your current location"
            />
            <SearchAddressItem name="Set location on map" type="map-location" />
          </>
        )}

        {searchedItems?.predictions?.map((pred) => (
          <SearchAddressItem
            key={pred.place_id}
            prediction={pred}
            onClick={() => handleChangePlace(pred)}
          />
        ))}
      </div>
    </div>
  );
}

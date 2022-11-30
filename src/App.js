import { useJsApiLoader } from '@react-google-maps/api';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { MapView } from './components/view/mapView';
import { LocationProvider } from './context/LocationContext';
import { PaymentProvider } from './context/PaymentContext';
import { RideProvider } from './context/RideContext';
import { Looking } from './routes/looking';
import { RideSelection } from './routes/ride-selection';
import { Testings } from './routes/testings';

const libraries = ['places'];

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <LocationProvider>
        <RideProvider>
          <PaymentProvider>
            <Routes>
              <Route path="/" element={<MapView />}>
                <Route index element={<Looking />} />
                <Route path="ride-selection" element={<RideSelection />} />
              </Route>

              <Route path="/testing" element={<Testings />} />
            </Routes>
          </PaymentProvider>
        </RideProvider>
      </LocationProvider>
    </BrowserRouter>
  );
}

export default App;

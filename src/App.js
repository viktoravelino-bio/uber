import { useJsApiLoader } from '@react-google-maps/api';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { Home } from './routes/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

const libraries = ['places'];

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return null;
  }

  return <RouterProvider router={router} />;
}

export default App;

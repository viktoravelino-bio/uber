import { useNavigate } from 'react-router-dom';
import { useRideContext } from '../context/RideContext';

export function useFinishRide() {
  const navigate = useNavigate();
  const { reset } = useRideContext();
  return function finishRide() {
    reset();
    navigate('/');
  };
}

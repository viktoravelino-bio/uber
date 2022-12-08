import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loading1 from '../assets/images/loading1.png';
import loading2 from '../assets/images/loading2.png';
import { Button } from '../components/atoms/button/Button';
import { LoadingProgressBar } from '../components/atoms/LoadingProgressBar/LoadingProgressBar';
import { RideDetails } from '../components/organisms/RideDetails/RideDetails';
import { useRideContext } from '../context/RideContext';

const steps = [
  { label: 'Confirming your trip', image: loading1 },
  { label: 'Connecting you to a driver', image: loading2 },
];

export function ConfirmingRide() {
  const { ride } = useRideContext();
  const navigate = useNavigate();
  const {
    matrix: { duration },
  } = ride;
  const [loadingStep, setLoadingStep] = useState(1);

  function calculateETA() {
    const currentTime = new Date().getTime();
    const etaTime = new Date(currentTime + duration * 1000);
    const etaFormatted = etaTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return etaFormatted;
  }

  //Simulate loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev === 4) navigate('/riding');
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className="confirming-ride__header"
        style={{ paddingInline: '1rem' }}
      >
        <h3 style={{ fontSize: '1.1rem' }}>
          {loadingStep === 1
            ? 'Confirming your trip'
            : 'Connecting you to a driver'}
        </h3>
        <LoadingProgressBar step={loadingStep} numberOfSteps={4} />
      </div>
      <div
        style={{
          borderBottom: '1px solid var(--clr-gray-400)',
          paddingBlock: '2rem',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <img src={loadingStep === 1 ? loading1 : loading2} alt="" height={80} />
      </div>
      <span
        style={{
          paddingBlock: '1rem',
          display: 'block',
          textAlign: 'center',
          borderBottom: '1px solid var(--clr-gray-400)',
        }}
      >
        Drop-off by {calculateETA()}
      </span>

      <RideDetails />

      <Button
        variant="ghost"
        style={{ color: 'red' }}
        onClick={() => console.log('cancel ride')}
      >
        Cancel
      </Button>
    </div>
  );
}

// create function to sum two numbers
function sum(a, b) {
  return a + b;
}

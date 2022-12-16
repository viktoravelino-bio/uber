import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CloseIcon } from '../../../assets/icons';
import { useRideContext } from '../../../context/RideContext';
import { useFinishRide } from '../../../hooks/useFinishRide';
import { Avatar } from '../../atoms/avatar/Avatar';
import { Button } from '../../atoms/button/Button';
import { RatingStars } from '../../molecules/RatingStars/RatingStars';
import './TipDriver.scss';

export function TipDriver() {
  const finishRide = useFinishRide();
  const [tipOptions, setTipOptions] = useState([
    {
      value: 1,
      active: false,
    },
    {
      value: 2,
      active: false,
    },
    {
      value: 3,
      active: false,
    },
  ]);
  const { rating } = useParams();
  const { ride } = useRideContext();
  const {
    destination: { address },
  } = ride;

  return (
    <div className="tip-driver">
      <div className="tip-driver__header">
        <CloseIcon height={18} width={18} />
        <span>{address}</span>
      </div>
      <div className="tip-driver__driver">
        <Avatar size={60} />
        <RatingStars readOnly initialRating={Number(rating)} />
        <Button
          onClick={() => console.log('Compliment driver')}
          variant="outlined"
        >
          Give a compliment
        </Button>
      </div>
      <div className="tip-driver__tip">
        <span>
          Drivers are keeping your community moving. Say thanks with a top
        </span>

        <div className="tip-driver__tip__options">
          {tipOptions.map((option) => (
            <Button
              key={option.value}
              variant={option.active ? '' : 'outlined'}
              onClick={() => {
                setTipOptions((prev) =>
                  prev.map((o) => {
                    if (o.value === option.value) {
                      return {
                        ...o,
                        active: !o.active,
                      };
                    }
                    return {
                      ...o,
                      active: false,
                    };
                  })
                );
              }}
            >
              $ {option.value}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={finishRide}>Done</Button>
    </div>
  );
}

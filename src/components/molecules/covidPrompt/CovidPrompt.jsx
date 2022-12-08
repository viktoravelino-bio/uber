import { useState } from 'react';
import { Button } from '../../atoms/button/Button';
import { ModalCard } from '../../atoms/modalCard/ModalCard';
import mask1 from '../../../assets/images/mask1.png';
import mask2 from '../../../assets/images/mask2.png';
import './CovidPrompt.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const CovidPrompt = ({ onRequestRide, ...props }) => {
  const [isChecked, setIsChecked] = useState(false);
  const isButtonDisabled = !isChecked;

  useEffect(() => {
    if (props.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [props.visible]);

  useEffect(() => {
    if (!props.visible) {
      setIsChecked(false);
    }
  }, [props.visible]);

  return (
    <ModalCard {...props} title="Help keep your community safe">
      <div className="covid-prompt__banner">
        <img src={mask1} alt="" />
        <img src={mask2} alt="" />
      </div>

      <div className="covid-prompt__body">
        <p>
          Do not ride if you may have COVID-19 or related symptoms. Learn more
          on the WHO COVID-19 site.
        </p>

        <ul>
          <li>
            <span className="covid-prompt__body__list__item__number">1</span>
            <p>Wash or sanitize your hands before and after your trip</p>
          </li>
          <li>
            <span className="covid-prompt__body__list__item__number">2</span>
            <p>Sit in the back seat if possible</p>
          </li>
          <li>
            <span className="covid-prompt__body__list__item__number">3</span>
            <p>Open the window for ventilation</p>
          </li>
        </ul>
      </div>
      <div className="covid-prompt__footer">
        <div className="covid-prompt__checkbox">
          <input
            type="checkbox"
            id="check"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label htmlFor="check">I am wearing a face covering or mask</label>
        </div>

        <Link
          to="/confirming-ride"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Button disabled={isButtonDisabled}>Confirm and ride</Button>
        </Link>
      </div>
    </ModalCard>
  );
};

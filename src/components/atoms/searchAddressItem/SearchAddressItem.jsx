import {
  PinIcon,
  CurrentLocationIcon,
  PinMapIcon,
} from '../../../assets/icons';
import './SearchAddressItem.scss';

const ICON_MAP = {
  general: <PinIcon />,
  'current-location': <CurrentLocationIcon />,
  'map-location': <PinMapIcon />,
};

export function SearchAddressItem({
  prediction,
  type = 'general',
  name,
  description,
  ...props
}) {
  // console.log(prediction);
  const title = prediction?.structured_formatting.main_text || name;
  const infoDescription =
    prediction?.structured_formatting.secondary_text || description;
  return (
    <div
      {...props}
      className="search-address-item"
      data-current-location={type === 'current-location' ? true : false}
    >
      <div className="icon-container">{ICON_MAP[type]}</div>
      <div className="info">
        <strong>{title}</strong>
        <span>{infoDescription}</span>
      </div>
    </div>
  );
}

import './SelectionListItem.scss';

export function SelectionListItem({
  image,
  leftIcon: Icon,
  label,
  rightIcon: RightIcon,
  ...rest
}) {
  return (
    <button {...rest} className="selection-list-item">
      <div className="selection-list-item__left-icon-container">
        {Icon && <Icon height={24} width={24} />}
        {image && !Icon && <img src={image} alt="" />}
      </div>
      <div className="selection-list-item__label-container">
        <p>{label || 'Label'}</p>
      </div>

      {RightIcon && (
        <div className="selection-list-item__right-icon-container">
          <RightIcon height={20} width={20} />
        </div>
      )}
    </button>
  );
}

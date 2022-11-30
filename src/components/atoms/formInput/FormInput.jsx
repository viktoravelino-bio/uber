import './FormInput.scss';
export function FormInput({
  label,
  infoCardComponent: InfoCardComponent,
  //   leftIcon: LeftIcon,
  rightIcon: RightIcon,
  as: Component = 'input',
  ...rest
}) {
  return (
    <div className="form-input__wrapper">
      <div className="form-input__label-container">
        {label && <label>{label}</label>}

        {InfoCardComponent && (
          <div className="info-card__wrapper">
            <button className="info-card__anchor">?</button>
            {/* <div className="info-card__body">
              <InfoCardComponent />
            </div> */}
          </div>
        )}
      </div>

      <div className="form-input">
        {/* {LeftIcon && <LeftIcon />} */}
        <Component {...rest} />
        {RightIcon && <RightIcon width={32} />}
      </div>
    </div>
  );
}

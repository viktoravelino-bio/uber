import './ChipButton.scss';

export function ChipButton({
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  children,
  ...props
}) {
  return (
    <button {...props} className={'btn ' + className}>
      {LeftIcon && <LeftIcon />}
      {children}
      {RightIcon && <RightIcon />}
    </button>
  );
}

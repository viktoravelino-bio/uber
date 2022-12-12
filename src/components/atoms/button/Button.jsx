import './Button.scss';

export function Button({ variant = 'primary', className, ...props }) {
  return (
    <button
      className={'button ' + className}
      data-variant={variant}
      {...props}
    />
  );
}

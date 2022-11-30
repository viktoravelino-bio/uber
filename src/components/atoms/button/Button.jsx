import './Button.scss';

export function Button({ variant = 'primary', ...props }) {
  return <button className="button" data-variant={variant} {...props} />;
}

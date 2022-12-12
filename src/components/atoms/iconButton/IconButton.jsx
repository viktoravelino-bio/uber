import './IconButton.scss';

export function IconButton({ icon: Icon, rounded, ...props }) {
  return (
    <button className="icon-button" {...props} data-rounded={Boolean(rounded)}>
      {Icon && <Icon height={22} width={22} />}
    </button>
  );
}

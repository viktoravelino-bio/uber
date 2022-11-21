import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, UserIcon } from '../../../assets/icons';
import { UberLogo } from '../../../assets/logo';

export function Header() {
  const { pathname } = useLocation();

  const canGoBack = pathname !== '/';

  return (
    <header
      style={{
        backgroundColor: 'transparent',
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 1,
        display: 'flex',
        padding: '1.5rem 1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {canGoBack ? (
        <Link to="..">
          <ArrowLeftIcon width={25} height={20} color="#000" />
        </Link>
      ) : (
        <UberLogo width={60} height={20} color="#000" />
      )}

      <UserIcon />
    </header>
  );
}

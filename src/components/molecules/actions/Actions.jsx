import { IconButton } from '../../atoms/iconButton/IconButton';
import { Input } from '../../atoms/input/Input';
import { Phone, Sun } from '../../../assets/icons';

export function Actions() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBlock: '1rem',
      }}
    >
      <Input
        placeholder="Any pick-up notes?"
        onFocus={() => console.log('open chat')}
      />
      <IconButton
        icon={Phone}
        rounded
        style={{
          color: 'black',
          backgroundColor: 'var(--clr-gray-300)',
        }}
        onClick={() => console.log('call driver')}
      />
      <IconButton
        icon={Sun}
        rounded
        style={{
          color: 'white',
          backgroundColor: 'green',
        }}
        onClick={() => console.log('beacon')}
      />
    </div>
  );
}

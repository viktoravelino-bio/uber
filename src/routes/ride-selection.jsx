import { ChevronDownIcon, ClockIcon } from '../assets/icons';
import { ChipButton } from '../components/atoms/chipButton/ChipButton';

export function RideSelection() {
  return (
    <div style={{ paddingInline: '1rem' }}>
      <ChipButton
        style={{ marginBlock: '1rem' }}
        leftIcon={ClockIcon}
        rightIcon={ChevronDownIcon}
      >
        Leave Now
      </ChipButton>
    </div>
  );
}

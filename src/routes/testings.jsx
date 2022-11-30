import { useState } from 'react';
import { PaymentModal } from '../components/molecules/paymentModal/PaymentModal';

export function Testings() {
  const [visible, setVisible] = useState(false);
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
      }}
    >
      <button onClick={() => setVisible((prev) => !prev)}>Toggle Modal</button>

      <PaymentModal
        visible={visible}
        onClose={() => setVisible(false)}
      ></PaymentModal>
    </div>
  );
}

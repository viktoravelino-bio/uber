import './PaymentModal.scss';

import { BottomModal } from '../../atoms/bottomModal/BottomModal';
import { createContext, useEffect, useState } from 'react';
import { PaymentSelection } from './PaymentSelection';
import { PaymentMethods } from './PaymentMethods';
import { NewCardForm } from './NewCardForm';

const tab_names = {
  'payment-selection': 'Payment options',
  'payment-methods': 'Add payment method',
  'add-card': 'Add credit or debit card',
};

const Context = createContext();

export function PaymentModal({ onClose, visible }) {
  const [tab, setTab] = useState('payment-selection');

  useEffect(() => {
    if (!visible) setTab('payment-selection');
  }, [visible]);

  return (
    <BottomModal onClose={onClose} visible={visible} title={tab_names[tab]}>
      <Context.Provider value={{ onClose, setTab }}>
        {tab === 'payment-selection' && <PaymentSelection context={Context} />}
        {tab === 'payment-methods' && <PaymentMethods context={Context} />}
        {tab === 'add-card' && <NewCardForm context={Context} />}
      </Context.Provider>
    </BottomModal>
  );
}

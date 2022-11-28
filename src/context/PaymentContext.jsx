import { createContext, useContext, useState } from 'react';
import data from '../assets/data/data.json';

const PaymentContext = createContext(null);

export function PaymentProvider({ children }) {
  const [paymentOptions, setPaymentOptions] = useState(data.paymentOptions);
  const [selectedPaymentOptionId, setSelectedPaymentOptionId] = useState(
    paymentOptions.find((p) => p.isDefault === true).id
  );

  const selectedPaymentOption = paymentOptions.find(
    (p) => p.id === selectedPaymentOptionId
  );

  const handleSelectPaymentOption = (id) => {
    setSelectedPaymentOptionId(id);
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentOptions,
        selectedPaymentOption,
        handleSelectPaymentOption,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  return useContext(PaymentContext);
}

import { useContext } from 'react';
import { Button } from '../../atoms/button/Button';
import InputMask from 'react-input-mask';
import { FormInput } from '../../atoms/formInput/FormInput';
import data from '../../../assets/data/data.json';
export function NewCardForm({ context }) {
  const { images_url } = data;
  const { onClose, setTab } = useContext(context);

  return (
    <div className="payment-modal" style={{ overflow: 'auto' }}>
      <div className="payment-modal__form-container">
        <InputMask mask="9999 9999 9999 9999" maskChar=" ">
          {(inputProps) => (
            <FormInput
              label="Card Number"
              errorMessage="Incorrect card number."
              rightIcon={(props) => (
                <img
                  src={images_url['mastercard']}
                  {...props}
                  style={{ objectFit: 'contain' }}
                />
              )}
              {...inputProps}
            />
          )}
        </InputMask>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <InputMask mask="99/99" placeholder="MM / YY">
            {(props) => (
              <FormInput
                label="Exp. Date"
                errorMessage="Incorrect card number."
                {...props}
              />
            )}
          </InputMask>
          <InputMask mask="999">
            {(inputProps) => (
              <FormInput
                label="Security Code"
                errorMessage="Incorrect card number."
                // TODO: Tooltip card
                infoCardComponent={() => <h1>info</h1>}
                {...inputProps}
              />
            )}
          </InputMask>
        </div>

        <FormInput
          as="select"
          label="Country"
          errorMessage="Incorrect card number."
        >
          <option value="1">USA</option>
          <option value="2">Canada</option>
          <option value="3">Mexico</option>
        </FormInput>
        <FormInput label="Zip Code" errorMessage="Incorrect card number." />
        <FormInput
          label="Nickname (optional)"
          errorMessage="Incorrect card number."
          placeholder="e.g. joint account or work card"
        />
      </div>
      <div className="payment-modal__footer">
        <Button disabled onClick={() => console.log('Add new card')}>
          Add Card
        </Button>

        <Button variant="ghost" onClick={() => setTab('payment-selection')}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

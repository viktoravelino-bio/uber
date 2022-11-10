import { forwardRef, memo } from 'react';
import './Input.scss';

function InputRoot({ className = '', ...props }, ref) {
  return <input {...props} className={'input-root ' + className} ref={ref} />;
}

export const Input = memo(forwardRef(InputRoot));

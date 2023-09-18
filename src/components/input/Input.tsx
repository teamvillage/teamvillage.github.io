import { useState } from 'react';
import styles from './input.module.scss';

interface Props {
  type?: string,
  label?: string,
  placeholder?: string,
  className?: string,
  labelClassName?: string,
  inputClassName?: string
}

function Input({
  type = 'text',
  label,
  placeholder,
  className = '',
  labelClassName = '',
  inputClassName = ''}: Props) {

  const [focused, setFocused] = useState(false);

  function focusEvent() {
    setFocused(true);
  }

  function blurEvent() {
    setFocused(false);
  }

  return (
    <div className={`${className} ${styles.inputForm}`}>
      <input type={type} className={`${inputClassName} ${focused ? styles.focused : ''}`} placeholder={placeholder} onFocus={focusEvent} onBlur={blurEvent}/>
      {
        label && 
        <div>
          <label className={`${labelClassName} ${focused ? styles.focused : ''}`}>{label}</label>
        </div>
      }
    </div>
  )
}

export default Input;

import { forwardRef, ReactNode } from 'react';
import styles from './textInput.module.scss';

interface TIProps {
  placeholder: string;
  onChange: () => void;
  label?: string | ReactNode;
  id: string;
}

const TextInput = forwardRef<HTMLInputElement, TIProps>((props, ref): JSX.Element => {
  const { label, id, placeholder, onChange } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} ref={ref} placeholder={placeholder} type="text" onChange={onChange} />
    </div>
  );
});
export default TextInput;

import { createPortal } from 'react-dom';
import styles from './toast.module.scss';

interface TProps {
  type: string;
  message: string;
}
const Toast = ({ type, message }: TProps) => {
  return createPortal(
    <div className={`${styles.container} ${type === 'success' ? styles.success : styles.error}`}>
      <p>{message}</p>
    </div>,
    document.body
  );
};

export default Toast;

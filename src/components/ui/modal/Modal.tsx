import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

interface MProps {
  children: JSX.Element;
}
const modalWTime = ({ children }: MProps) => {
  return createPortal(
    <div className={`${styles.container} modalOpened`}>
      <div>{children}</div>
    </div>,
    document.body
  );
};

export default modalWTime;

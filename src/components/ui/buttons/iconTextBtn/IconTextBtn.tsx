import { ReactNode } from 'react';
import styles from './iconTextBtn.module.scss';

interface ITBProps {
  text: string;
  icon: ReactNode;
  onClick: () => void;
}

const IconTextBtn = ({ icon, text, onClick }: ITBProps): JSX.Element => {
  return (
    <button onClick={onClick} className={styles.btn}>
      {text} {icon}
    </button>
  );
};

export default IconTextBtn;

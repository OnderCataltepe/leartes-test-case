import { ReactNode } from 'react';
import styles from './iconBtn.module.scss';
interface IProps {
  onClick: () => void;
  icon: ReactNode;
  disabled?: boolean;
}

const IconBtn = ({ onClick, icon, disabled }: IProps): JSX.Element => {
  return (
    <button disabled={disabled} onClick={onClick} className={styles.btn}>
      {icon}
    </button>
  );
};

export default IconBtn;

import { Link } from 'react-router-dom';
import styles from './outlinedBtn.module.scss';
interface OProps {
  onClick?: () => void;
  path?: string;
  text: string;
}

const OutlinedBtn = ({ path, onClick, text }: OProps): JSX.Element => {
  return path ? (
    <Link to={path} className={styles.linkBtn}>
      {text}
    </Link>
  ) : (
    <button onClick={onClick} className={styles.btn}>
      {text}
    </button>
  );
};

export default OutlinedBtn;

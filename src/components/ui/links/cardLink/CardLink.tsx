import styles from './cardLink.module.scss';
import { Link } from 'react-router-dom';
interface CLProps {
  path: string;
  brand: string;
  name: string;
}
const CardLink = ({ path, brand, name }: CLProps) => {
  return (
    <Link className={styles.linkItem} to={path}>
      <span>{brand}</span> {name}
    </Link>
  );
};

export default CardLink;

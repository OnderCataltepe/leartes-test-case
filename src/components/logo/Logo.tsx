import styles from './logo.module.scss';
import { logo } from '~/assets';
import { Link } from 'react-router-dom';
const Logo = (): JSX.Element => {
  return (
    <Link to="/" className={styles.container}>
      <p>LOGO</p>
      <img alt="Logo" src={logo} />
    </Link>
  );
};
export default Logo;

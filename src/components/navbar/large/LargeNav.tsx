import styles from './largeNav.module.scss';
import { Link } from 'react-router-dom';
import { NAV_DATA } from '~/constants';
const LargeNav = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <ul>
        {NAV_DATA.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LargeNav;

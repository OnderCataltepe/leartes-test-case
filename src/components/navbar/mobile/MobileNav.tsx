import styles from './mobileNav.module.scss';
import { Link } from 'react-router-dom';
import { NAV_DATA } from '~/constants';
interface MProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const MobileNav = ({ setOpenMenu }: MProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <ul>
        {NAV_DATA.map((item, index) => (
          <li key={index}>
            <Link onClick={() => setOpenMenu(false)} to={item.path}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileNav;

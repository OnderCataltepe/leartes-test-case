import styles from './menuBtn.module.scss';
interface MProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const MenuBtn = ({ openMenu, setOpenMenu }: MProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <input
        id="hamburger"
        onChange={(e) => setOpenMenu(e.target.checked)}
        checked={openMenu}
        type="checkbox"
      />

      <label htmlFor="hamburger" className={styles.dropdown}>
        <span>
          <span className={`${styles.iconBar} ${styles.topBar}`}></span>
          <span className={`${styles.iconBar} ${styles.middleBar}`}></span>
          <span className={`${styles.iconBar} ${styles.bottomBar}`}></span>
        </span>
      </label>
    </div>
  );
};

export default MenuBtn;

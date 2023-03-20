import { Navbar, Logo, MenuBtn, CartMenu } from '~/components';
import styles from './header.module.scss';
import { useState } from 'react';
const Header = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.container}>
      <div>
        <Logo />
        <Navbar openMenu={open} setOpenMenu={setOpen} />
        <div className={styles.icons}>
          <CartMenu />
          <MenuBtn openMenu={open} setOpenMenu={setOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;

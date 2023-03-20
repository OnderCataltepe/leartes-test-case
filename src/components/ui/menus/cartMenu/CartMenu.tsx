import styles from './cartMenu.module.scss';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IconBtn, BasketContainer, OutlinedBtn } from '~/components';
import { useState } from 'react';
import { useAppSelector } from '~/store/store';
const CartMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const cart = useAppSelector((state) => state.cart.cart);
  const badgeNumber = cart.map((item) => item.amount).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.container}>
      <div className={styles.btn}>
        <IconBtn onClick={() => setOpenMenu(!openMenu)} icon={<MdOutlineShoppingCart />} />
        {cart.length > 0 && <div className={styles.badge}>{badgeNumber}</div>}
      </div>
      {openMenu && (
        <div className={styles.menu}>
          <BasketContainer products={cart} />
          <OutlinedBtn onClick={() => alert('Not active')} text="My Cart" />
        </div>
      )}
    </div>
  );
};

export default CartMenu;

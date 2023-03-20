import styles from './rootLayout.module.scss';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '~/components';
import { useAppDispatch } from '~/store/store';
import { useEffect } from 'react';
import { getCart } from '~/store/reducers/cartSlice';
const RootLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCart('cart'));
  }, []);
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

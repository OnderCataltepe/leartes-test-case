import styles from './productCard.module.scss';
import { useEffect, useState } from 'react';
import type { ProductType } from '~/types';
import { MdAddShoppingCart } from 'react-icons/md';
import { CardLink, IconBtn, Toast } from '~/components';
import { useAppSelector, useAppDispatch } from '~/store/store';
import { postCart, patchCart, hideMessage } from '~/store/reducers/cartSlice';
import { MAX_WARNING } from '~/constants';

const ProductCard = (item: ProductType): JSX.Element => {
  const { cart, successMessage } = useAppSelector((state) => state.cart);
  const [warning, setWarning] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const addProduct = (): void => {
    const updateProduct = cart.find((el) => el.id === item.id);
    const postItem = {
      id: item.id,
      title: item.title,
      slug: item.slug,
      brand: item.brand,
      max_amount: item.max_amount,
      price: item.price,
      amount: updateProduct ? updateProduct.amount + 1 : 1,
      image: item.images[0]
    };
    if (updateProduct) {
      if (updateProduct.amount < updateProduct.max_amount) {
        dispatch(patchCart(postItem));
      } else {
        setWarning(true);
      }
    } else {
      dispatch(postCart(postItem));
    }
  };

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    if (successMessage) {
      timeOut = setTimeout(() => {
        dispatch(hideMessage());
      }, 3000);
    }
    if (warning) {
      timeOut = setTimeout(() => {
        setWarning(false);
      }, 3000);
    }
    return () => clearTimeout(timeOut);
  }, [successMessage, warning]);
  return (
    <div className={styles.container}>
      <img alt={item.title} src={item.images[0]} />
      <div className={styles.cardInfo}>
        <div>
          <CardLink path={item.slug} brand={item.brand} name={item.title} />
        </div>
        <div className={styles.shopping}>
          <div className={styles.price}>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div className={styles.btnContainer}>
            <IconBtn onClick={addProduct} icon={<MdAddShoppingCart />} />
          </div>
        </div>
      </div>
      {(successMessage || warning) && (
        <Toast
          type={successMessage ? 'success' : 'warning'}
          message={successMessage ? successMessage : MAX_WARNING}
        />
      )}
    </div>
  );
};

export default ProductCard;

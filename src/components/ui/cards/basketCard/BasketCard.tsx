import styles from './basketCard.module.scss';
import { CartProductType } from '~/types';
import { IconBtn } from '~/components';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useAppDispatch } from '~/store/store';
import { patchCart, deleteCartItem } from '~/store/reducers/cartSlice';
const BasketCard = (item: CartProductType): JSX.Element => {
  const dispatch = useAppDispatch();
  const addProduct = () => {
    const postItem = { ...item, amount: item.amount + 1 };
    if (item.amount < item.max_amount) {
      dispatch(patchCart(postItem));
    }
  };
  const reduceProduct = () => {
    const postItem = { ...item, amount: item.amount - 1 };
    if (item.amount > 1) {
      dispatch(patchCart(postItem));
    } else {
      dispatch(deleteCartItem(item.id));
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img alt={item.title} src={item.image} />
      </div>
      <div className={styles.info}>
        <p>{item.title}</p>
        <div>
          <p>${(item.price * item.amount).toFixed(2)}</p>

          <div className={styles.amount}>
            <div>
              <IconBtn onClick={reduceProduct} icon={<AiOutlineMinus />} />
            </div>
            <div>{item.amount}</div>
            <div>
              <IconBtn
                disabled={item.amount === item.max_amount ? true : false}
                onClick={addProduct}
                icon={<AiOutlinePlus />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;

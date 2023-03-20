import { CartProductType } from '~/types';
import { BasketCard } from '~/components';
import styles from './basketContainer.module.scss';
interface BCProps {
  products: CartProductType[];
}
const BasketContainer = ({ products }: BCProps) => {
  const totalPrice = products
    .map((item) => item.price * item.amount)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
  console.log(products);
  return (
    <div className={styles.container}>
      <p className={styles.total}>Total: ${totalPrice}</p>
      {products.length > 0 ? (
        products.map((item) => <BasketCard key={item.id} {...item} />)
      ) : (
        <p className={styles.empty}>No products in the cart.</p>
      )}
    </div>
  );
};
export default BasketContainer;

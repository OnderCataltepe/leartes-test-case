import { ProductType } from '~/types';
import styles from './productContainer.module.scss';
import { ProductCard } from '~/components';
interface PCProps {
  products: ProductType[];
}
const ProductContainer = ({ products }: PCProps): JSX.Element => {
  return (
    <>
      {products.length > 0 ? (
        <div className={styles.productContainer}>
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyList}>
          <p>No Results Match</p>
        </div>
      )}
    </>
  );
};

export default ProductContainer;

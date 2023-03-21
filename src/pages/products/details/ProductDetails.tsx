import styles from './productDetails.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import API from '~/api/httpRequests';
import { ProductType } from '~/types';
import { Modal, Loading, Error, IconTextBtn, Toast, Carousel } from '~/components';
import { MdAddShoppingCart } from 'react-icons/md';
import { useAppSelector, useAppDispatch } from '~/store/store';
import { postCart, patchCart, hideMessage } from '~/store/reducers/cartSlice';
import { MAX_WARNING } from '~/constants';

const ProductDetails = (): JSX.Element => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const [warning, setWarning] = useState<boolean>(false);
  const { cart, successMessage, error } = useAppSelector((state) => state.cart);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [product, setProduct] = useState<ProductType | null>(null);
  const addProduct = (): void => {
    if (product) {
      const updateProduct = cart.find((el) => el.id === product.id);
      const postItem = {
        id: product.id,
        title: product.title,
        slug: product.slug,
        brand: product.brand,
        max_amount: product.max_amount,
        price: product.price,
        amount: updateProduct ? updateProduct.amount + 1 : 1,
        image: product.images[0]
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
    }
  };
  useEffect(() => {
    API.get(`products/?slug=${slug}`)
      .then((response: AxiosResponse<ProductType[]>) => {
        setProduct(response.data[0]);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error(error.response);
            setErrorMessage(error.response.status + ' ' + error.response.statusText);
          }
          setErrorMessage(error.message);
        } else {
          console.error(error);
        }
      })
      .finally(() => setPageLoading(false));
  }, []);
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
  if (pageLoading) {
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  }
  if (errorMessage || !product) {
    return <Error message={errorMessage ? errorMessage : error ? error.status_message : '404'} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Carousel items={product.images} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <div>
              <h1>
                {product.brand} {product.title}
              </h1>
              <p>Price: ${product.price.toFixed(2)}</p>
            </div>
            <IconTextBtn onClick={addProduct} text="Add to cart" icon={<MdAddShoppingCart />} />
          </div>
          <div className={styles.details}>
            <p>Details</p>
            <div>
              <p>
                Frame Color: <span>{product.frame_color}</span>{' '}
              </p>
              <p>
                Frame Material: <span>{product.frame_material}</span>{' '}
              </p>
              <p>
                Lens Color: <span>{product.lens_color}</span>
              </p>
            </div>
            <div>
              <p>
                Ploarised: <span>{product.polarised ? 'Yes' : 'No'}</span>
              </p>
              <p>
                Shape: <span>{product.shape}</span>{' '}
              </p>
              <p>
                Gender: <span>{product.gender}</span>{' '}
              </p>
            </div>
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

export default ProductDetails;

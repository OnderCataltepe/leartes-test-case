import styles from './products.module.scss';
import {
  CategoryForm,
  ProductContainer,
  TextInput,
  CategoryMenu,
  Loading,
  Modal,
  Error
} from '~/components';
import { useRef, useState, useEffect } from 'react';
import { ProductType, CategoryType } from '~/types';
import { AiOutlineSearch } from 'react-icons/ai';
import { filterProducts, mapCategories } from '~/utils';
import axios, { AxiosResponse } from 'axios';
import API from '~/api/httpRequests';
import { categoryArr } from '~/constants';
import InfiniteScroll from 'react-infinite-scroll-component';

const Products = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedCat, setSelectedCat] = useState<CategoryType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filtered, setFiltered] = useState<ProductType[]>([]);
  const [categorised, setCategorised] = useState<ProductType[]>([]);

  const fetchData = (): void => {
    API.get(`products?_page=${page}&_limit=12`).then((response: AxiosResponse<ProductType[]>) => {
      const updatedData = [...products, ...response.data];
      setFiltered(updatedData);
      setCategorised(updatedData);
      setProducts(updatedData);
    });
  };
  useEffect(() => {
    API.get('products')
      .then((response: AxiosResponse<ProductType[]>) => {
        const categories = categoryArr.map((item) => mapCategories(response.data, item));
        const initialSelected = categories.map((item) => ({ ...item, values: [] }));
        setCategories(categories);
        setSelectedCat(initialSelected);
        setErrorMessage(null);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error(error.response);
            setErrorMessage(error.response.status + ' ' + error.response.statusText);
          }
        } else {
          console.error(error);
        }
      })
      .finally(() => setPageLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  const changeHandler = (): void => {
    if (searchRef.current) {
      const inputValue = searchRef.current.value.trim().toLowerCase();
      const filteredProducts = categorised.filter(
        (item) =>
          item.title.toLowerCase().includes(inputValue) ||
          item.brand.toLowerCase().includes(inputValue)
      );
      setFiltered(filteredProducts);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newEl = filterProducts(products, selectedCat);
    if (searchRef) {
      searchRef.current!.value = '';
    }
    setCategorised(newEl);
    setFiltered(newEl);
  };

  if (pageLoading) {
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  }
  if (errorMessage) {
    return <Error message={errorMessage} />;
  }
  return (
    <div className={styles.container}>
      <div>
        <CategoryForm
          categories={categories}
          selectedCat={selectedCat}
          setSelectedCat={setSelectedCat}
          onSubmit={submitHandler}
        />
      </div>
      <div>
        <div className={styles.filter}>
          <TextInput
            placeholder="Search..."
            ref={searchRef}
            label={<AiOutlineSearch />}
            onChange={changeHandler}
            id="searchFilter"
          />
          <CategoryMenu
            categories={categories}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            onSubmit={submitHandler}
          />
        </div>

        {products.length > 0 && (
          <InfiniteScroll
            dataLength={page * 12}
            next={() => setPage((prev) => prev + 1)}
            hasMore={products.length < page * 12 ? false : true}
            loader={searchRef.current?.value.trim().length === 0 ? <Loading /> : <></>}>
            {filtered && <ProductContainer products={filtered} />}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Products;

import styles from './categoryForm.module.scss';
import { CheckBoxContainer } from '~/components';
import type { CategoryType } from '~/types';
import React, { SetStateAction } from 'react';
interface CFProps {
  selectedCat: CategoryType[];
  categories: CategoryType[];
  setSelectedCat: React.Dispatch<SetStateAction<{ values: string[] | never[]; name: string }[]>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const CategoryForm = ({ selectedCat, categories, setSelectedCat, onSubmit }: CFProps) => {
  return (
    <form onSubmit={onSubmit} className={styles.categoryForm}>
      <p>Categories</p>
      {categories.map((item) => (
        <CheckBoxContainer
          selectedCat={selectedCat}
          setSelectedCat={setSelectedCat}
          key={item.name}
          item={item}
        />
      ))}
      <button type="submit">Apply</button>
    </form>
  );
};

export default CategoryForm;

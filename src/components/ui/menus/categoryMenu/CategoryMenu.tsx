import styles from './categoryMenu.module.scss';
import { useState } from 'react';
import { CategoryForm, IconTextBtn } from '~/components';
import type { CategoryType } from '~/types';
import React, { SetStateAction } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
interface CFProps {
  selectedCat: CategoryType[];
  categories: CategoryType[];
  setSelectedCat: React.Dispatch<SetStateAction<{ values: string[] | never[]; name: string }[]>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const CategoryMenu = ({ selectedCat, categories, setSelectedCat, onSubmit }: CFProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    onSubmit(e);
    setOpenMenu(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.btn}>
        <IconTextBtn
          onClick={() => setOpenMenu((prev) => !prev)}
          text="Filter"
          icon={openMenu ? <AiOutlineMinus /> : <AiOutlinePlus />}
        />
      </div>

      {openMenu && (
        <div className={`${styles.menu} ${openMenu ? 'modalOpened' : null}`}>
          <CategoryForm
            categories={categories}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            onSubmit={submitHandler}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;

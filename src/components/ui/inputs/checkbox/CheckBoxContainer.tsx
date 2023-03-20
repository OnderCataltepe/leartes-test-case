import React, { SetStateAction, useState } from 'react';
import styles from './checkBoxContainer.module.scss';
import { CheckBox } from '~/components';
import type { CategoryType } from '~/types';
interface CCProps {
  item: CategoryType;
  selectedCat: CategoryType[];
  setSelectedCat: React.Dispatch<SetStateAction<{ values: string[] | never[]; name: string }[]>>;
}
const CheckBoxContainer = ({ item, selectedCat, setSelectedCat }: CCProps): JSX.Element => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
    const asda = Object.entries({
      ...checkedItems,
      [event.target.name]: event.target.checked
    })
      .filter(([key, value]) => value)
      .map((item) => item[0]);
    const changeData = selectedCat.map((subItem) => {
      if (subItem.name === item.name) {
        return { ...subItem, values: asda };
      }
      return { ...subItem };
    });
    setSelectedCat(changeData);
  };

  return (
    <div className={styles.container}>
      <p>{item.name.replace(/_/g, ' ').toUpperCase()}</p>
      {item.values.map((item) => (
        <CheckBox key={item} item={item} checked={checkedItems[item]} onChange={handleChange} />
      ))}
      <br />
    </div>
  );
};

export default CheckBoxContainer;

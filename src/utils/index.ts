import { ProductType, CategoryType } from '~/types';

export const mapCategories = (arr: ProductType[], type: string) => {
  const propName = type;
  const categoryArr: string[] = [];
  arr.map((item) => !categoryArr.includes(item[type]) && categoryArr.push(item[type]));
  return { name: propName, values: categoryArr };
};

export const filterProducts = (products: ProductType[], categories: CategoryType[]) => {
  const filterCategories = categories.filter((item) => item.values.length > 0);
  const filteredProd = products?.filter((el) => {
    return filterCategories.every((subItem) =>
      subItem.values.some((asd) => asd === el[subItem.name])
    );
  });
  return filteredProd;
};

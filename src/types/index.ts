export interface ProductType {
  id: number;
  title: string;
  slug: string;
  brand: string;
  gender: string;
  frame_color: string;
  frame_material: string;
  lens_color: string;
  max_amount: number;
  price: number;
  polarised: boolean;
  shape: string;
  images: Array<string>;
}

export interface CategoryType {
  name: string;
  values: string[] | never[];
}

export interface CartProductType {
  id: number;
  title: string;
  slug: string;
  max_amount: number;
  price: number;
  amount: number;
  image: string;
}

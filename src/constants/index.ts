const BRAND = 'brand';
const GENDER = 'gender';
const FRAME_COLOR = 'frame_color';
const FRAME_MATERIAL = 'frame_material';
const LENS_COLOR = 'lens_color';
const SHAPE = 'shape';
export const categoryArr: Array<string> = [
  BRAND,
  GENDER,
  FRAME_COLOR,
  FRAME_MATERIAL,
  LENS_COLOR,
  SHAPE
];

interface NavType {
  title: string;
  path: string;
}
export const NAV_DATA: Array<NavType> = [
  { title: 'Home', path: '/' },
  { title: 'Products', path: '/products' }
];

export const MAX_WARNING = 'You have reached the maximum number of products you can add.';

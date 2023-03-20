import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';
import { Home, Cart, Products, ProductDetails, ErrorPage } from '~/pages';
import { RootLayout } from '~/layouts';
const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'products/:slug',
        element: <ProductDetails />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
];
const router = createBrowserRouter(routes);

const Routing = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default Routing;

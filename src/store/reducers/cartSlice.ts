import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '~/api/httpRequests';
import type { AxiosError } from 'axios';
import type { CartProductType } from 'types';

interface ValidationErrors {
  status_message: string;
  status: number;
}
interface CartState {
  cart: Array<CartProductType>;
  totalPrice: number;
  successMessage: null | string;
  error: null | ValidationErrors;
  loading: boolean;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  successMessage: null,
  error: null,
  loading: false
};

const getCart = createAsyncThunk<Array<CartProductType>, string, { rejectValue: ValidationErrors }>(
  'cart/get',
  async (url, { rejectWithValue }) => {
    try {
      const response = await API.get(url);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }

      console.log(error.response);
      return rejectWithValue({
        status_message: error.response.data.status_message,
        status: error.response.status
      });
    }
  }
);

const postCart = createAsyncThunk<
  CartProductType,
  CartProductType,
  { rejectValue: ValidationErrors }
>('cart/post', async (product, { rejectWithValue }) => {
  try {
    const { data } = await API.post('cart', product);
    return data;
  } catch (err) {
    const error = err as AxiosError<ValidationErrors>;
    if (!error.response) {
      throw err;
    }
    console.log(error.response);
    return rejectWithValue({
      status_message: error.response.data.status_message,
      status: error.response.status
    });
  }
});
const patchCart = createAsyncThunk<
  CartProductType,
  CartProductType,
  { rejectValue: ValidationErrors }
>('cart/patch', async (product, { rejectWithValue }) => {
  const { id, amount } = product;
  try {
    const { data }: { data: CartProductType } = await API.patch(`cart/${id}`, { amount: amount });
    return data;
  } catch (err) {
    const error = err as AxiosError<ValidationErrors>;
    if (!error.response) {
      throw err;
    }

    console.log(error.response);
    return rejectWithValue({
      status_message: error.response.data.status_message,
      status: error.response.status
    });
  }
});

const deleteCartItem = createAsyncThunk<number, number, { rejectValue: ValidationErrors }>(
  'cart/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data }: { data: CartProductType } = await API.delete(`cart/${id}`);
      return id;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      console.log(error.response);
      return rejectWithValue({
        status_message: error.response.data.status_message,
        status: error.response.status
      });
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hideMessage(state) {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action: PayloadAction<CartProductType[]>) => {
        state.loading = false;
        state.error = null;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(postCart.fulfilled, (state, action: PayloadAction<CartProductType>) => {
        state.loading = false;
        state.error = null;
        state.cart = [...state.cart, action.payload];
        state.successMessage = `${action.payload.title} has been added to cart.`;
      })
      .addCase(postCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCart.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(patchCart.fulfilled, (state, action: PayloadAction<CartProductType>) => {
        state.loading = false;
        state.error = null;
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.successMessage = `Number of ${action.payload.title} updated.`;
      })
      .addCase(patchCart.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(patchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.error = null;
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      });
  }
});

export default cartSlice.reducer;
export const { hideMessage } = cartSlice.actions;
export { getCart, postCart, patchCart, deleteCartItem };

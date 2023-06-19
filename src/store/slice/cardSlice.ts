import { IProduct } from './productsSlice';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCard } from "../thunk/productsThunk";
import { addToCart } from '../thunk/cartThunk';

interface IProductSlice {
  data: IProduct;
  error: string | null
}

const initialState: IProductSlice = {
  data: {} as IProduct,
  error: null
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getCard.fulfilled,
      (state, action: PayloadAction<IProduct>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(
      getCard.pending,
      (state) => {
        state.data = {} as IProduct;
      }
    );
    builder.addCase(
      addToCart.rejected,
      (state) => {
        state.error = "Товар закончился";
        setTimeout(() => {
          state.error = null
        }, 2000);
      }
    );
  },
});

export default productSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCartSlice } from "../../types/store";
import { addToCart, clearCart, getCart } from "../thunk/cartThunk";

interface ISlice {
  data: TCartSlice;
  error: string | null;
}

const initialState: ISlice = {
  data: {} as TCartSlice,
  error: null,
};

export const categorySlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getCart.fulfilled,
      (state, action: PayloadAction<TCartSlice>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(addToCart.rejected, (state) => {
      state.error = "Товар закончился";
      setTimeout(() => {
        state.error = null;
      }, 2000);
    });
    builder.addCase(
      clearCart.fulfilled,
      (state, action: PayloadAction<TCartSlice>) => {
        state.data = action.payload;
      }
    );
  },
});

export default categorySlice.reducer;

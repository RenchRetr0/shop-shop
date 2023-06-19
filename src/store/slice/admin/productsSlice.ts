import { IProduct } from './../productsSlice';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { editProduct, getAdminProducts } from "../../thunk/adminThunk";

interface IInitialState {
  data: IProduct[];
  message: string | null
}

const initialState: IInitialState = {
  data: [],
  message: null
};

export const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getAdminProducts.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(
      editProduct.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.message = action.payload;
      }
    );
  },
});

export default adminProductsSlice.reducer;

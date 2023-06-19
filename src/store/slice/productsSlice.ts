import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllProduct } from "../thunk/productsThunk";
import { TUser } from "../../types/store";

export interface IProduct {
  id: number;
  count: number;
  name: string;
  countre: string;
  description: string;
  link: string;
  price: string;
  like: [
    {
      id: number;
      like: boolean;
      user: TUser;
    }
  ];
  category: {
    id: number;
    name: string;
  };
  comment: TComment[]
}

export type TComment = {
  id: number
  comment: string
}
interface IProductSlice {
  products: IProduct[];
}

const initialState: IProductSlice = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getAllProduct.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload;
      }
    );
  },
});

export default productsSlice.reducer;

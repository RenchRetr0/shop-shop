import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getFavorites } from "../thunk/favoriteThunk";

export interface Product {
  id: number;
  name: string;
  countre: string;
  description: string;
  count: string;
  price: string;
  link: string;
}

export interface DataItem {
  id: number;
  product: Product;
}

export interface IFavoriteSlice {
  data: DataItem[]
}

const initialState: IFavoriteSlice = {
  data: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getFavorites.fulfilled,
      (state, action: PayloadAction<DataItem[]>) => {
        state.data = action.payload;
      }
    );
  },
});

export default favoriteSlice.reducer;

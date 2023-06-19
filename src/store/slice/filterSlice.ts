import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISort } from "../../components/sortList";

export interface IFilterSlice {
  category: number | null;
  sort: ISort;
}

const initialState: IFilterSlice = {
  category: null,
  sort: {
    value: "new",
    name: "По дате",
    type: "ASC",
  },
};

export const productsSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<ISort>) {
      state.sort = action.payload;
    },
    setCategory(state, action: PayloadAction<number | null>) {
      state.category = action.payload;
    },
  },
});

export const { setSort, setCategory } = productsSlice.actions;

export default productsSlice.reducer;

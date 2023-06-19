import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAllCategory } from "../thunk/productsThunk";
import { createCategory } from "../thunk/adminThunk";

interface IRequest {
  id: number
  name: string
}
interface ICategorySlice {
  category: IRequest[];
  status: null | string
}

const initialState: ICategorySlice = {
  category: [],
  status: null
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getAllCategory.fulfilled,
      (state, action: PayloadAction<IRequest[]>) => {
        state.category = action.payload;
      }
    );
    builder.addCase(
      createCategory.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.status = action.payload;
      }
    );
  },
});

export default categorySlice.reducer;

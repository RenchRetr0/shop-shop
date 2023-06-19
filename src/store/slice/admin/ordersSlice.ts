import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createProduct, getOrders, orderComplete } from "../../thunk/adminThunk";
import { TCartSlice } from "../../../types/store";

interface IInitialState {
  data: TCartSlice[]
  status: number | null
}

const initialState: IInitialState = {
  data: [],
  status: null
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getOrders.fulfilled,
      (state, action: PayloadAction<TCartSlice[]>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(
      orderComplete.fulfilled,
      (state, action: PayloadAction<TCartSlice[]>) => {
        state.data = action.payload;
      }
    );
    builder.addCase(
      createProduct.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.status = action.payload;
      }
    );
  },
});

export default ordersSlice.reducer;

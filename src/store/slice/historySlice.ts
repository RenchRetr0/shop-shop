import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getHistory } from "../thunk/adminThunk";
import { TCartSlice } from "../../types/store";

interface IinitialState {
  history: TCartSlice[]
}

const initialState: IinitialState = {
  history: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getHistory.fulfilled,
      (state, action: PayloadAction<TCartSlice[]>) => {
        state.history = action.payload;
      }
    );
  },
});

export default historySlice.reducer;

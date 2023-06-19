import { IAuthRequest, TProfile } from "./../../types/store/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { login, createProfile, registration } from "../thunk/authThunk";

interface IAuthSlice {
  data: IAuthRequest;
  isAuth: boolean;
  error: string | null;
}

const initialState: IAuthSlice = {
  data: {} as IAuthRequest,
  isAuth: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<IAuthRequest>) => {
        state.data = action.payload;
        state.isAuth = true;
      }
    );
    builder.addCase(
      createProfile.fulfilled,
      (state, action: PayloadAction<TProfile>) => {
        state.data.user.profile = action.payload;
        state.isAuth = true;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload == 401) {
        state.error = "Не коректно введен email либо пароль";
      }
    });
    builder.addCase(registration.rejected, (state, action) => {
      if (action.payload == 400) {
        state.error = "email занят";
      }
    });
}});

export default authSlice.reducer;

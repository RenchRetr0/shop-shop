import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProfileResponse } from "../../types/store";
import axios from "axios";

export const registration = createAsyncThunk(
  "registration",
  async (data: { email: string; password: string }) => {
    try {
      const user = await axios.post(
        "https://shop-b6zj.onrender.com/user/create",
        data
      );
      console.log(user.data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await axios.post(
        "https://shop-b6zj.onrender.com/auth/sign-in",
        data
      );
      await sessionStorage.setItem("token", user.data.data.accessToken);
      return user.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.status || 500);
    }
  }
);

export const createProfile = createAsyncThunk(
  "createProfile",
  async (data: TProfileResponse, { rejectWithValue }) => {
    try {
      const profile = await axios.post(
        "https://shop-b6zj.onrender.com/profile/create",
        data
      );
      return profile.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.status || 500);
    }
  }
);

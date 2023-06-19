import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFavorites = createAsyncThunk("favorite/all", async () => {
  try {
    const favorites = await axios.get(
      `https://shop-b6zj.onrender.com/favorite/all`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return favorites.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const addToFavorite = createAsyncThunk(
  "favorite/add/:productId",
  async (id: number) => {
    try {
      const favorites = await axios.get(
        `https://shop-b6zj.onrender.com/favorite/add/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      console.log(favorites.data.data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const removeToFavorite = createAsyncThunk(
  "favorite/del/:productId",
  async (id: number) => {
    try {
      const favorites = await axios.get(
        `https://shop-b6zj.onrender.com/favorite/del/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      console.log(favorites.data.data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

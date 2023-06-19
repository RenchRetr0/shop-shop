import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategory = createAsyncThunk("category", async () => {
  try {
    const category = await axios.get(
      "https://shop-b6zj.onrender.com/category"
    );

    return category.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const getAllProduct = createAsyncThunk(
  "product/catalog",
  async (filter: any) => {
    try {
      const products = await axios.post(
        `https://shop-b6zj.onrender.com/product/catalog`,
        filter
      );

      return products.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const getCard = createAsyncThunk(
  "product/getOne/:id",
  async (id: number) => {
    try {
      const card = await axios.get(
        `https://shop-b6zj.onrender.com/product/getOne/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      return card.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
});

export const addLike = createAsyncThunk("product/like", async (obj: any) => {
  try {
    const card = await axios.post(
      `https://shop-b6zj.onrender.com/product/like`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return card.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const addComment = createAsyncThunk("product/comment", async (obj: any) => {
  try {
    const card = await axios.post(
      `https://shop-b6zj.onrender.com/product/comment`,
      obj,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return card.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

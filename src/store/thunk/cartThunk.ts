import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "add-card",
  async (id: number, { rejectWithValue }) => {
    try {
      const products = await axios.get(
        `https://shop-b6zj.onrender.com/order/addProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      return products.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.status || 500);
    }
  }
);
export const getCart = createAsyncThunk("order/orders", async () => {
  try {
    const products = await axios.get(
      `https://shop-b6zj.onrender.com/order/get-order`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return products.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
});
export const minusProduct = createAsyncThunk(
  "minus-count/:productId",
  async (id: number) => {
    try {
      const products = await axios.get(
        `https://shop-b6zj.onrender.com/order/minus-count/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      return products.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const checkoutOrder = createAsyncThunk(
  "order/checkout-order/:productId",
  async (id: number) => {
    try {
      const products = await axios.get(
        `https://shop-b6zj.onrender.com/order/checkout-order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      return products.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const clearCart = createAsyncThunk("order/clear/:orderId", async (id: number) => {
  try {
    const cart = await axios.get(
      `https://shop-b6zj.onrender.com/order/clear/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return cart.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
});

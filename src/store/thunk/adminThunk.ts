import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ICreateProduct {
  name: string;
  countre: string;
  description: string;
  categoryName: string;
  count: number;
  price: number;
  photo: File;
}

export const createProduct = createAsyncThunk(
  "product/create",
  async (data: any) => {
    try {
      const addProduct = await axios.post(
        "https://shop-b6zj.onrender.com/product/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(addProduct?.data?.data);
      return 200
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (name: string) => {
    try {
      const addCategory = await axios.post(
        "https://shop-b6zj.onrender.com/category/create",
        {
          name
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return addCategory.data.message
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const orderComplete = createAsyncThunk(
  "order/update-status/:orderId/:status",
  async (data: { orderId: number, status: number}) => {
    try {
      const addCategory = await axios.get(
        `https://shop-b6zj.onrender.com/order/update-status/${data.orderId}/${data.status}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return addCategory.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/admin/get-orders",
  async () => {
    try {
      const addproduct = await axios.get(
        "https://shop-b6zj.onrender.com/order/admin/get-orders",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return addproduct.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const getHistory = createAsyncThunk(
  "order/history/:role",
  async (role: string) => {
    try {
      const history = await axios.get(
        `https://shop-b6zj.onrender.com/order/history/${role}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return history.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const getAdminProducts = createAsyncThunk(
  "product/products/admin",
  async () => {
    try {
      const products = await axios.get(
        `https://shop-b6zj.onrender.com/product/products/admin`,
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

export const clearProductCount = createAsyncThunk(
  "product/delete/:productid",
  async (id: number) => {
    try {
      const products = await axios.get(
        `https://shop-b6zj.onrender.com/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(products.data.data)
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const editProduct  = createAsyncThunk(
  "product/update/:productId",
  async (obj: any) => {
    try {
      const product = await axios.put(
        `https://shop-b6zj.onrender.com/product/update/${obj.id}`,
        obj.form,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return product.data.message
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

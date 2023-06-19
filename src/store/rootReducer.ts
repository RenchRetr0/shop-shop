import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import categorySlice from "./slice/categorySlice";
import productsSlice from "./slice/productsSlice";
import filterSlice from "./slice/filterSlice";
import cardSlice from "./slice/cardSlice";
import cartSlice from "./slice/cartSlice";
import ordersSlice from "./slice/admin/ordersSlice";
import historySlice from "./slice/historySlice";
import adminProductsSlice from "./slice/admin/productsSlice";
import favoriteSlice from "./slice/favoriteSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  category: categorySlice,
  products: productsSlice,
  filter: filterSlice,
  card: cardSlice,
  cart: cartSlice,
  orders: ordersSlice,
  history: historySlice,
  adminProducts: adminProductsSlice,
  favorite: favoriteSlice
});

export default rootReducer;

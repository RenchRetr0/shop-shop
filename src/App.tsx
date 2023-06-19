import { Route, Routes } from "react-router-dom";
import Registration from "./components/registration";
import Login from "./components/login";
import MainPage from "./pages/main";
import Products from "./pages/products";
import MainRoute from "./utils/route/MainRoute";
import AboutPage from "./pages/about";
import ProductPage from "./pages/product";
import CardPage from "./pages/cart";
import PrivateRoute from "./utils/route";
import Adminka from "./pages/adminka";
import AdminOrdersPage from "./pages/orders";
import AdminCreateProductPage from "./pages/careateProduct";
import AdminkaCreateCategoryPage from "./pages/createCategory";
import AdminHistory from "./pages/history";
import UserHistory from "./pages/historyUser";
import AdminProducts from "./pages/adminProducts";
import "./App.css";
import EditProduct from "./components/editProduct";
import FavoritesPage from "./pages/favorite";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainRoute />}>
          <Route path="" element={<MainPage />} />
          <Route path="products" element={<Products />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="card/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/adminka" element={<Adminka />}>
            <Route path="/adminka/order" element={<AdminOrdersPage />} />
            <Route
              path="/adminka/create-product"
              element={<AdminCreateProductPage />}
            />
            <Route
              path="/adminka/create-category"
              element={<AdminkaCreateCategoryPage />}
            />
            <Route path="/adminka/history" element={<AdminHistory />} />
            <Route path="/adminka/products" element={<AdminProducts />} />
            <Route path="/adminka/product-edit/:id" element={<EditProduct />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="cart" element={<CardPage />} />
            <Route path="favorite" element={<FavoritesPage />} />
            <Route path="history" element={<UserHistory />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

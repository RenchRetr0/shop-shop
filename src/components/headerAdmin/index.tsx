import { NavLink } from "react-router-dom";
import s from "./style.module.css";

const HeaderAdminka = () => {
  return (
    <ul className={s.nav}>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.nav_item} ${s.active}` : s.nav_item
          }
          to="/adminka/order"
        >
          Управление заказами
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.nav_item} ${s.active}` : s.nav_item
          }
          to="/adminka/create-product"
        >
          Создание товара
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.nav_item} ${s.active}` : s.nav_item
          }
          to="/adminka/create-category"
        >
          Создание категории
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.nav_item} ${s.active}` : s.nav_item
          }
          to="/adminka/history"
        >
          История заказов
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.nav_item} ${s.active}` : s.nav_item
          }
          to="/adminka/products"
        >
          Управление товарами
        </NavLink>
      </li>
    </ul>
  );
};

export default HeaderAdminka;

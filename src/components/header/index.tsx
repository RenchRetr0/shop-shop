import { NavLink, useNavigate } from "react-router-dom";
import s from "./style.module.css";
import { useAuth } from "../../utils/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Header = () => {
  const navigate = useNavigate();
  const isAuth = useAuth();
  const role = useSelector((state: RootState) => state.auth.data.user?.role);

  const handleClick = () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("persist:root");
      navigate("/");
    }
  };

  return (
    <header className={s.header}>
      <ul className={s.list}>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.list_item} ${s.active}` : s.list_item
            }
            to=""
          >
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.list_item} ${s.active}` : s.list_item
            }
            to="/products"
          >
            Каталог
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${s.list_item} ${s.active}` : s.list_item
            }
            to="/about-us"
          >
            О нас
          </NavLink>
        </li>
        {sessionStorage.getItem("token") && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${s.list_item} ${s.active}` : s.list_item
              }
              to="/history"
            >
              История
            </NavLink>
          </li>
        )}
        {role === "ADMIN" && sessionStorage.getItem("token") && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${s.list_item} ${s.active}` : s.list_item
              }
              to="/adminka/order"
            >
              Админка
            </NavLink>
          </li>
        )}
        {sessionStorage.getItem("token") && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${s.list_item} ${s.active}` : s.list_item
              }
              to="/cart"
            >
              Корзина
            </NavLink>
          </li>
        )}
        {sessionStorage.getItem("token") && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${s.list_item} ${s.active}` : s.list_item
              }
              to="/favorite"
            >
              Избранные
            </NavLink>
          </li>
        )}
      </ul>
      <button onClick={handleClick} className={s.header_button}>
        {isAuth ? "Выйти" : "Авторизироваться"}
      </button>
    </header>
  );
};

export default Header;

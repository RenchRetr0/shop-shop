import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSchema } from "../../utils/yup";
import { RootState, useAppDispatch } from "../../store";
import { login } from "../../store/thunk/authThunk";
import { useSelector } from "react-redux";
import s from "./style.module.css";

const Login = (): JSX.Element => {
  const { error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AuthSchema),
  });

  const handleSubmitForm = async (data: any) => {
    try {
      await dispatch(login(data));
      if (sessionStorage.getItem("token")) {
        navigate("/");
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className={s.wrapper}>
      <section className={s.registration}>
        <span></span>
        <div>
          <h2 className={s.title}>Авторизоваться</h2>
          {error && (
            <p
              style={{
                marginBottom: "15px",
                color: "red",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "16px",
              }}
            >
              *{error}
            </p>
          )}

          <form onSubmit={handleSubmit(handleSubmitForm)} className={s.form}>
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
            >
              <input
                className={s.form_input}
                placeholder="Введите адрес электронной почты"
                type="email"
                {...register("email")}
              />
              <label className={s.errorMessage}>
                {errors.email ? `${errors.email.message}` : ""}
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
            >
              <input
                className={s.form_input}
                placeholder="Введите ваш пароль"
                type="password"
                {...register("password")}
              />
              <label className={s.errorMessage}>
                {errors.password ? `${errors.password.message}` : ""}
              </label>
            </div>
            <button className={s.form_button} type="submit">
              Отправить
            </button>
            <Link className={s.link} to="/register">
              Регистрация
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;

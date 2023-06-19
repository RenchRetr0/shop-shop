import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileSchema } from "../../utils/yup";
import { RootState, useAppDispatch } from "../../store";
import {
  login,
  registration,
  createProfile,
} from "../../store/thunk/authThunk";
import { TProfileResponse } from "../../types/store";
import { useSelector } from "react-redux";
import s from "./style.module.css";

const Registration = (): JSX.Element => {
  const { error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileSchema),
  });

  const handleSubmitForm = async (info: any) => {
    try {
      const registrationCreate = {
        email: info.email,
        password: info.password,
      };
      const profileCreate: TProfileResponse = {
        firstName: info.firstName,
        lastName: info.lastName,
        patronym: info.patronym,
        address: info.address,
        phone: info.phone,
      };
      await dispatch(registration(registrationCreate));
      await dispatch(login(registrationCreate));
      if(sessionStorage.getItem('token')){
        navigate("/");
        dispatch(createProfile(profileCreate));
      }
    } catch (e) {
      return e;
    }
  };

  return (
    <div className={s.wrapper}>
      <section className={s.registration}>
        <span></span>
        <div>
          <h2 className={s.title}>Регистрация</h2>
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
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
            >
              <input
                className={s.form_input}
                placeholder="Введите ваше имя"
                type="firstName"
                {...register("firstName")}
              />
              <label className={s.errorMessage}>
                {errors.password ? `${errors.password.message}` : ""}
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
            >
              <input
                className={s.form_input}
                placeholder="Введите вашу фамилию"
                type="lastName"
                {...register("lastName")}
              />
              <label className={s.errorMessage}>
                {errors.lastName ? `${errors.lastName.message}` : ""}
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
            >
              <input
                className={s.form_input}
                placeholder="Введите ваше отчество"
                type="patronym"
                {...register("patronym")}
              />
              <label className={s.errorMessage}>
                {errors.patronym ? `${errors.patronym.message}` : ""}
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
            >
              <input
                className={s.form_input}
                placeholder="Введите ваш адрес"
                type="address"
                {...register("address")}
              />
              <label className={s.errorMessage}>
                {errors.address ? `${errors.address.message}` : ""}
              </label>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", rowGap: 10 }}
            >
              <input
                className={s.form_input}
                placeholder="Введите ваш телефон"
                type="phone"
                {...register("phone")}
              />
              <label className={s.errorMessage}>
                {errors.phone ? `${errors.phone.message}` : ""}
              </label>
            </div>

            <button className={s.form_button} type="submit">
              Отправить
            </button>
            <Link className={s.link} to="/login">
              Войдите
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Registration;

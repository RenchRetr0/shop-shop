import * as yup from "yup";

export const AuthSchema = yup.object().shape({
  email: yup.string().email("почта не верна").required("это поле обезательно"),
  password: yup
    .string()
    .min(6, "не меньше 6 символов")
    .max(20, "не больше 20 символов")
    .required("это поле обезательно")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "должнен быть один заглавный символ, символ в нижнем регистре и цифра"
    ),
});

export const ProfileSchema = yup.object().shape({
  email: yup.string().email("почта не верна").required("это поле обезательно"),
  password: yup
    .string()
    .min(6, "не меньше 6 символов")
    .max(20, "не больше 20 символов")
    .required("это поле обезательно")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "должнен быть один заглавный символ, символ в нижнем регистре и цифра"
    ),
  firstName: yup
    .string()
    .min(3, "имя не может быть меньше 3 символов")
    .required("это поле обезательно"),
  lastName: yup
    .string()
    .min(3, "фамилия не может быть меньше 3 символов")
    .required("это поле обезательно"),
  patronym: yup
    .string()
    .notRequired(),
  address: yup.string().required("это поле обезательно"),
  phone: yup
    .string()
    .matches(
      /^(\+7|\+8|7|8)?[-(]?\d{3}[-)]?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
      "не валидный номер"
    )
    .required("это поле обезательно"),
});

export const CreateProductSchema = yup.object().shape({
  name: yup.string().required("это поле обезательно"),
  countre: yup.string().required("это поле обезательно"),
  description: yup.string().required("это поле обезательно"),
  count: yup.number().required("это поле обезательно"),
  price: yup.number().required("это поле обезательно"),
  photo: yup.mixed().required("это поле обезательно"),
});

export const EditProductSchema = yup.object().shape({
  countre: yup.string().notRequired(),
  description: yup.string().notRequired(),
  count: yup.number().notRequired(),
  price: yup.number().notRequired(),
  photo: yup.mixed().notRequired(),
});
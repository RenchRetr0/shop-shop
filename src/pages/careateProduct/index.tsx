import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CreateProductSchema } from "../../utils/yup";
import { createProduct } from "../../store/thunk/adminThunk";
import { RootState, useAppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCategory } from "../../store/thunk/productsThunk";
import s from "./style.module.css";

const AdminCreateProductPage = () => {
  const { category } = useSelector((state: RootState) => state.category);
  const {status} = useSelector((state: RootState) => state.orders)
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateProductSchema),
  });
  const [categoryId, setCategoryId] = useState({
    id: 1,
    name: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmitForm = async (data: any) => {
    const formData = new FormData();
    formData.append("photo", data.photo[0]);
    formData.append("name", data.name);
    formData.append("countre", data.countre);
    formData.append("description", data.description);
    formData.append("categoryId", String(categoryId?.id));
    formData.append("count", data.count);
    formData.append("price", data.price);
    await Promise.resolve();

    await dispatch(createProduct(formData));
  };

  useEffect(() => {
    dispatch(getAllCategory())
    if (status) alert(status?.toString);
  }, [dispatch, status]);
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(handleSubmitForm)}>
        <h2>Создание товара</h2>
        <div className={s.form_item}>
          <input
            className={s.form__input}
            placeholder="Введите название товара"
            type="text"
            {...register("name")}
          />
          <label className={s.form_label}>
            {errors.name ? `${errors.name.message}` : ""}
          </label>
        </div>
        <div className={s.form_item}>
          <input
            className={s.form__input}
            placeholder="Введите страну производителя"
            type="text"
            {...register("countre")}
          />
          <label className={s.form_label}>
            {errors.countre ? `${errors.countre.message}` : ""}
          </label>
        </div>
        <div className={s.form_item}>
          <input
            className={s.form__input}
            placeholder="Введите описание товара"
            type="text"
            {...register("description")}
          />
          <label className={s.form_label}>
            {errors.description ? `${errors.description.message}` : ""}
          </label>
        </div>
        <div className={s.form_item}>
          <h4 style={{ cursor: "pointer" }} onClick={() => setIsOpen(!isOpen)}>
            {categoryId?.name || "Выберите категорию"}
          </h4>
          {isOpen && (
            <ul
              style={{
                backgroundColor: "#212123",
                display: "flex",
                padding: 15,
                flexDirection: "column",
                rowGap: 10,
                borderRadius: 15,
              }}
            >
              {category?.map((obj) => (
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => setCategoryId({ ...obj })}
                >
                  {obj?.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={s.form_item}>
          <input
            className={s.form__input}
            placeholder="Введите количество товара"
            type="number"
            {...register("count")}
          />
          <label className={s.form_label}>
            {errors.count ? `${errors.count.message}` : ""}
          </label>
        </div>
        <div className={s.form_item}>
          <input
            className={s.form__input}
            placeholder="Введите цену товара"
            type="number"
            {...register("price")}
          />
          <label className={s.form_label}>
            {errors.price ? `${errors.price.message}` : ""}
          </label>
        </div>
        <div className={s.form_item}>
          <input className={s.form__input} {...register("photo")} type="file" />
          <label className={s.form_label}>
            {errors.photo ? `${errors.photo.message}` : ""}
          </label>
        </div>

        <button className={s.button} type="submit">
          Создать
        </button>
      </form>
    </>
  );
};

export default AdminCreateProductPage;

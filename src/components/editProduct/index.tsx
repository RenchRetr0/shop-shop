import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditProductSchema } from "../../utils/yup";
import { RootState, useAppDispatch } from "../../store";
import { editProduct } from "../../store/thunk/adminThunk";
import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { getCard } from "../../store/thunk/productsThunk";
import { useSelector } from "react-redux";
import s from "./style.module.css";

const EditProduct = () => {
  const dispatch = useAppDispatch();
  const param = useParams();
  const card = useSelector((state: RootState) => state.card.data);
  const status = useSelector((state: RootState) => state.adminProducts.message);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditProductSchema),
    defaultValues: {
      countre: card?.countre?.toString(),
      description: card?.description?.toString(),
      count: card?.count?.toString(),
      price: card?.price?.toString(),
      photo: undefined
    },
  });

  const handleSubmitForm = async (data: any) => {
    const formData = new FormData();
    if (data?.photo[0] !== undefined) {
      formData.append("photo", data?.photo[0]);
    }
    formData.append("countre", data.countre);
    formData.append("description", data.description);
    formData.append("count", data.count);
    formData.append("price", data.price);

    await Promise.resolve();

    const item = {
      form: formData,
      id: param.id,
    };
    await dispatch(editProduct(item));
  };

  const handleReset = useCallback(() => {
    reset({
      countre: card.countre?.toString(),
      description: card.description?.toString(),
      count: card.count?.toString(),
      price: card.price?.toString(),
    });
  },[card, reset])

  useEffect(() => {
    dispatch(getCard(Number(param.id)));
    if (status) alert(status);
  }, [dispatch, param.id, status]);
  useEffect(() => {
    handleReset();
  }, [card, handleReset]);

  return (
    <form className={s.form} onSubmit={handleSubmit(handleSubmitForm)}>
      <h3>Изменение товара</h3>
      <h4>
        Название товара:
        <span
          style={{
            color: "#6C3EB8",
            fontSize: 18,
            lineHeight: "20px",
            marginLeft: 10,
          }}
        >
          {card?.name}
        </span>
      </h4>
      <div className={s.form_item}>
        <input
          placeholder="Введите название странны производителя"
          className={s.form__input}
          type="text"
          {...register("countre")}
        />
        <label className={s.form_label}>
          {errors.countre ? `${errors.countre.message}` : ""}
        </label>
      </div>
      <div className={s.form_item}>
        <textarea
          style={{ height: 250 }}
          placeholder="Введите описание продукта"
          className={s.form__input}
          {...register("description")}
        />
        <label className={s.form_label}>
          {errors.description ? `${errors.description.message}` : ""}
        </label>
      </div>
      <div className={s.form_item}>
        <input
          className={s.form__input}
          type="number"
          {...register("count")}
          placeholder="Введите количество продукта"
        />
        <label className={s.form_label}>
          {errors.count ? `${errors.count.message}` : ""}
        </label>
      </div>
      <div className={s.form_item}>
        <input
          className={s.form__input}
          type="number"
          {...register("price")}
          placeholder="Введите цена продукта"
        />
        <label className={s.form_label}>
          {errors.price ? `${errors.price.message}` : ""}
        </label>
      </div>
      <div className={s.form_item}>
        <input className={s.form__input} type="file" {...register("photo")} />
        <label className={s.form_label}>
          {errors.photo ? `${errors.photo.message}` : ""}
        </label>
      </div>
      <button className={s.button}>Изменить</button>
    </form>
  );
};

export default EditProduct;

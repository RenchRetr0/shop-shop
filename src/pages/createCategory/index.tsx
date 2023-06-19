import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { createCategory } from "../../store/thunk/adminThunk";
import { useSelector } from "react-redux";
import s from "./style.module.css";

const AdminkaCreateCategoryPage = () => {
  const dispatch = useAppDispatch();
  const {status} = useSelector((state: RootState) => state.category)
  const [value, setValue] = useState<string | null>(null);

  const handleSubmit = () => {
    if (value && value?.length > 3) {
      dispatch(createCategory(value));
    }
  };

  useEffect(() => {
    if(status) alert(`${status.toString()}`)
  }, [status])

  return (
    <>
      <section className={s.form}>
        <h2 className={s.form_title}>Создание категории</h2>
        <input
          onChange={(e) => setValue(e.target.value)}
          className={s.form_input}
          type="text"
          placeholder="Введите название категории"
        />
        <button onClick={handleSubmit} className={s.form_btn}>
          Создать
        </button>
      </section>
    </>
  );
};

export default AdminkaCreateCategoryPage;

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { setCategory } from "../../store/slice/filterSlice";
import s from "./style.module.css";

const Category = () => {
  const dispatch = useAppDispatch()
  const filter = useSelector((state: RootState) => state.filter.category)
  const { category } = useSelector((state: RootState) => state.category);

  const handleSetCategory = (id: number | null) => {
    dispatch(setCategory(id))
  }

  return (
    <ul className={s.category}>
      <li
        onClick={() => handleSetCategory(null)}
        className={
          filter !== null ? s.category_item : `${s.category_item} ${s.active}`
        }
      >
        Все товары
      </li>
      {category.map((obj) => (
        <li
          key={obj.id}
          onClick={() => handleSetCategory(obj.id)}
          className={
            filter !== obj.id
              ? s.category_item
              : `${s.category_item} ${s.active}`
          }
        >
          {obj.name}
        </li>
      ))}
    </ul>
  );
};

export default Category;

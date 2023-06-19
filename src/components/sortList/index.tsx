import { useState } from "react";
import s from "./style.module.css";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { setSort } from "../../store/slice/filterSlice";

export interface ISort {
  name: string;
  value: string;
  type: "ASC" | "DESC";
}

const SortListComponent = () => {
  const array: ISort[] = [
    { name: "По дате", value: "new", type: "ASC" },
    { name: "По дате", value: "old", type: "DESC" },
    { name: "По цене", value: "expensive", type: "ASC" },
    { name: "По цене", value: "cheap", type: "DESC" },
    { name: "По алфавиту", value: "alphabet", type: "ASC" },
    { name: "По алфавиту", value: "back", type: "DESC" },
  ];

  const dispatch = useAppDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);

  const hanlseSetSort = (sort: ISort) => {
    dispatch(setSort(sort));
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={s.sort} onClick={() => setIsOpen(!isOpen)}>
      <div
        className={s.activ}
        style={{ display: "flex", alignItems: "center", columnGap: 10 }}
      >
        <h4 className={s.activ_name}>{sort.name}</h4>
        <svg
          className={sort.type === "DESC" ? s.reverte : ""}
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="8"
          viewBox="0 0 12 8"
        >
          <polygon fill="#616E74" points="0,8 6,0 12,8" />
        </svg>
      </div>

      {isOpen && (
        <ul className={s.list}>
          {array.map((obj) => (
            <div
              key={obj.value}
              onClick={() => hanlseSetSort(obj)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                columnGap: 10,
              }}
            >
              <li className={s.list_item}>{obj.name}</li>
              <svg
                className={obj.type === "DESC" ? s.reverte : ""}
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="8"
                viewBox="0 0 12 8"
              >
                <polygon fill="#616E74" points="0,8 6,0 12,8" />
              </svg>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortListComponent;

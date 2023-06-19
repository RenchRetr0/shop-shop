import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { getHistory } from "../../store/thunk/adminThunk";
import { useSelector } from "react-redux";
import s from "./style.module.css";

type TisOpenState = {
  open: boolean;
  id: number | null;
};

const UserHistory = () => {
  const dispatch = useAppDispatch();
  const { history } = useSelector((state: RootState) => state.history);
  const [isOpen, setIsOpen] = useState<TisOpenState>({
    open: false,
    id: null,
  });

  useEffect(() => {
    dispatch(getHistory("user"));
  }, [dispatch]);
  return (
    <section className="container" style={{marginTop: 20}}>
      {history.length > 0 &&
        history.map((obj) => (
          <div className={s.orders}>
            <div className={s.item} key={obj?.id}>
              <svg
                onClick={() =>
                  setIsOpen({
                    id: obj.id,
                    open: !isOpen.open,
                  })
                }
                className={
                  isOpen.open && isOpen.id === obj.id ? s.svg_rotate : s.svg
                }
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="8"
                viewBox="0 0 12 8"
              >
                <polygon fill="#616E74" points="0,8 6,0 12,8" />
              </svg>
              <h3 className={s.email}>{obj?.user?.email}</h3>
              <h5 className={s.price}>{obj?.price}руб.</h5>
              <h3
                className={
                  obj.isStatus === "Готов"
                    ? s.true
                    : obj.isStatus === "Ожидание"
                    ? s.pedding
                    : s.false
                }
              >
                {obj.isStatus}
              </h3>
            </div>

            <div className={s.order_items_block}>
              {isOpen.id === obj.id &&
                isOpen.open &&
                obj?.orderItems.map((obj) => (
                  <div key={obj.product.id} className={s.order_items}>
                    <img
                      className={s.order_img}
                      src={obj.product.link}
                      alt=""
                      width={100}
                      height={80}
                    />
                    <h4 className={s.order_title}>{obj.product.name}</h4>
                    <h6 className={s.order_count}>{obj.count} кол-во</h6>
                    <span className={s.order_total}>{obj.total}.руб</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default UserHistory;
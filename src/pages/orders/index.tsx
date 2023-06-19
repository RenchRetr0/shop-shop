import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { getOrders, orderComplete } from "../../store/thunk/adminThunk";
import { useSelector } from "react-redux";
import s from "./style.module.css";

type TisOpenState = {
  open: boolean
  id: number | null
};

const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.orders);
  const [isOpen, setIsOpen] = useState<TisOpenState>({
    open: false,
    id: null,
  });

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleOrderComplete = (id: number, status: number) => {
    const data = {
      orderId: id,
      status: status,
    };
    dispatch(orderComplete(data));
  }

  return (
    <section className={s.orders}>
      <h2 style={{textAlign: 'center', marginBottom: 20}}>Управление заказами</h2>
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#191919",
          color: "#6C3EB8",
          borderRadius: 15,
        }}
      >
        <h3 style={{ marginLeft: 220 }}>Почта</h3>
        <h3 style={{ marginLeft: "-50px" }}>Цена заказа</h3>
        <h3 style={{ marginLeft: "-60px" }}>Принять</h3>
        <h3 style={{ marginRight: 50 }}>Отменить</h3>
      </div>
      {data.length > 0 &&
        data.map((obj) => (
          <section>
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
              <button
                onClick={() => handleOrderComplete(obj.id, 1)}
                className={s.button}
              >
                Потвердить
              </button>
              <button
                onClick={() => handleOrderComplete(obj.id, 0)}
                className={s.button}
              >
                Оклонить
              </button>
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
          </section>
        ))}
    </section>
  );
};

export default AdminOrdersPage;

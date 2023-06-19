import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { addToCart, checkoutOrder, clearCart, getCart } from "../../store/thunk/cartThunk";
import { minusProduct } from "../../store/thunk/cartThunk";

const CartPage = () => {
  const [isReload, setIsReload] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useSelector((state: RootState) => state.cart.data);
  const error = useSelector((state: RootState) => state.cart.error);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, isReload]);

  const addCount = async (id: number) => {
    await dispatch(addToCart(id));
    setIsReload(!isReload);
  };
  const minusCount = async (id: number) => {
    await dispatch(minusProduct(id));
    setIsReload(!isReload);
  };

  const handleCheckoutOrder = async (id: number) => {
    await dispatch(checkoutOrder(id))
    setIsReload(!isReload);
  }
  const handleClearCart = async (id: number) => {
    await dispatch(clearCart(id))
    setIsReload(!isReload);
  }
  useEffect(() => {
    if (error) alert(error?.toString);
  }, [error]);
  return (
    <main className="container">
      {cart?.orderItems?.length > 0 && (
        <h2 style={{ marginBottom: 20, marginLeft: 25 }}>Корзина</h2>
      )}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 20,
          alignItems: "center",
        }}
      >
        {cart?.orderItems?.length === 0 && (
          <h1 style={{ marginTop: 20 }}>Корзина пуста</h1>
        )}
        {cart?.orderItems?.length > 0 &&
          cart?.orderItems.map((obj) => (
            <div
              style={{
                width: '90%',
                padding: 15,
                display: "flex",
                columnGap: 60,
                alignItems: "center",
                border: "2px solid #6C3EB8",
                borderRadius: 15,
              }}
            >
              <img src={obj?.product.link} width={120} height={120} />
              <h4 style={{ maxWidth: 300 }}>{obj?.product.name}</h4>
              <div
                style={{
                  width: 110,
                  display: "flex",
                  margin: "0 auto",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <button
                  onClick={() => addCount(obj.product.id)}
                  style={{
                    width: 40,
                    padding: "8px 0",
                    backgroundColor: "#6C3EB8",
                    border: "none",
                    borderRadius: 10,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
                <span
                  style={{
                    fontWeight: 300,
                    fontSize: "18px",
                    lineHeight: "20px",
                  }}
                >
                  {obj?.count}
                </span>
                <button
                  onClick={() => minusCount(obj.product.id)}
                  style={{
                    width: 40,
                    padding: "8px 0",
                    backgroundColor: "#6C3EB8",
                    border: "none",
                    borderRadius: 10,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
              </div>
              <span>{obj?.count} кол-во</span>
              <h6 style={{ fontWeight: 400, fontSize: 18, lineHeight: "20px" }}>
                {obj?.total} руб.
              </h6>
            </div>
          ))}
      </section>
      {cart?.orderItems?.length > 0 && (
        <div
          style={{
            marginTop: 20,
            marginLeft: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginTop: 20 }}>Итог: {cart?.price} ₽</h2>
          <button
            onClick={() => handleCheckoutOrder(cart.id)}
            style={{
              width: 240,
              padding: "12px 0",
              backgroundColor: "#6C3EB8",
              border: "none",
              borderRadius: 15,
              color: "#fff",
              cursor: "pointer",
              fontSize: 16,
              lineHeight: "18px",
            }}
          >
            Оформить заказ
          </button>
          <button
            onClick={() => handleClearCart(cart?.id)}
            style={{
              width: 240,
              padding: "12px 0",
              backgroundColor: "#6C3EB8",
              border: "none",
              borderRadius: 15,
              color: "#fff",
              cursor: "pointer",
              fontSize: 16,
              lineHeight: "18px",
            }}
          >
            Очистить корзину
          </button>
        </div>
      )}
    </main>
  );
};

export default CartPage;

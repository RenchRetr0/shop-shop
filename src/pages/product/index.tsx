import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { addComment, getCard } from "../../store/thunk/productsThunk";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart, getCart, minusProduct } from "../../store/thunk/cartThunk";
import s from "./style.module.css";
import { addToFavorite, getFavorites, removeToFavorite } from "../../store/thunk/favoriteThunk";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { data, error } = useSelector((state: RootState) => state.card);
  const item = useSelector((state: RootState) => state.cart.data);
  const favorites = useSelector((state: RootState) => state.favorite.data);
  const [isReload, setIsReload] = useState(false);
  const [isReviews, setIsReviews] = useState(true);

  useEffect(() => {
    dispatch(getCard(Number(params?.id)));
    dispatch(getCart());
    dispatch(getFavorites());
  }, [params, dispatch, isReload]);

  const handleAdd = async () => {
    await dispatch(addToCart(data?.id));
    setIsReload(!isReload);
  };
  const handleRemove = async () => {
    await dispatch(minusProduct(data?.id));
    setIsReload(!isReload);
  };

  const foundItem =
    item !== undefined &&
    item !== null &&
    item?.orderItems?.find((obj) => obj?.product?.id === data?.id);

  useEffect(() => {
    if (error) alert(error?.toString);
  }, [error]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const item = {
      comment: event?.target[0]?.value,
      productId: params?.id,
    };
    if (item?.comment?.length < 256) {
      await dispatch(addComment(item));
      setIsReload(!isReload);
    }
  };

  const isFavorite = favorites.find((obj) => obj?.product?.id === data?.id);
  const handleAddFavorite = async (obj: any) => {
    if(obj){
      await dispatch(addToFavorite(data?.id));
      setIsReload(!isReload)
    }else {
      await dispatch(removeToFavorite(data?.id));
      setIsReload(!isReload)
    }
  }
  return (
    <main className="container">
      <h2 style={{ textAlign: "center", marginTop: "3rem" }}>{data?.name}</h2>
      <section className={s.item}>
        <img className={s.img} src={data?.link} width={400} height={400} />
        <div className={s.table}>
          <div className={s.row}>
            <div className={s.root_column}>Страна производитель</div>
            <div className={s.column}>{data?.countre}</div>
          </div>
          <div className={s.row}>
            <div className={s.root_column}>Категория</div>
            <div className={s.column}>{data?.category?.name}</div>
          </div>
          <div className={s.row}>
            <div className={s.root_column}>Кол-во товара</div>
            <div className={s.column}>{data?.count}</div>
          </div>
          <div className={s.row}>
            <div className={s.root_column}>Цена</div>
            <div className={s.column}>{data?.price}</div>
          </div>
          {!foundItem ? (
            <button onClick={handleAdd} className={s.button}>
              Добавить в корзину
            </button>
          ) : (
            <div
              style={{
                width: 120,
                display: "flex",
                margin: "0 auto",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={handleAdd}
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
                {foundItem?.count}
              </span>
              <button
                onClick={handleRemove}
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
          )}
          {sessionStorage.getItem("token") && (
            <svg
              onClick={() => handleAddFavorite(!isFavorite)}
              style={{ cursor: "pointer" }}
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path
                d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z"
                fill={isFavorite ? "#6C3EB8" : "black"}
              />
            </svg>
          )}
        </div>
      </section>
      <div className={s.info}>
        <h6
          onClick={() => setIsReviews(true)}
          className={
            isReviews ? `${s.activeTitle} ${s.info_title}` : s.info_title
          }
        >
          Описание
        </h6>
        <h6
          onClick={() => setIsReviews(false)}
          className={
            isReviews ? s.info_title : `${s.activeTitle} ${s.info_title}`
          }
        >
          Отзывы
        </h6>
        {isReviews ? (
          <p className={s.info_txt}>{data?.description}</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              rowGap: 20,
            }}
          >
            {data?.comment?.map((obj) => (
              <p
                style={{
                  padding: "15px 20px",
                  backgroundColor: "#212123",
                  borderRadius: 15,
                  fontSize: 20,
                  lineHeight: "22px",
                }}
                key={obj?.id}
              >
                {obj?.comment}
              </p>
            ))}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 40,
              }}
            >
              <textarea
                style={{
                  width: "80%",
                  height: "100px",
                  padding: "12px 22px",
                  backgroundColor: "#212123",
                  outline: "none",
                  border: "1px solid #6C3EB8",
                  borderRadius: 15,
                  color: "#fffff1",
                }}
              />
              <button
                style={{
                  width: 150,
                  height: 40,
                  border: "none",
                  borderRadius: 15,
                  backgroundColor: "#6C3EB8",
                  fontSize: 16,
                  lineHeight: "18px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Отправить
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductPage;

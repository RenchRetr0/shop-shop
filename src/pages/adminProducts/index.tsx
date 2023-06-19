import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { clearProductCount, getAdminProducts } from "../../store/thunk/adminThunk";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "./style.module.css";

const AdminProducts = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.adminProducts.data);
  const [isReload, setIsReload] = useState(false)

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch, isReload]);

  const handleClearCountProduct = async (id: number) => {
    await dispatch(clearProductCount(id));
    setIsReload(!isReload)
  }

  const sortArray = [...data].sort((a, b) => b.count - a.count);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>
        Управление товарами
      </h1>
      <section style={{ display: "flex", flexDirection: "column", rowGap: 20 }}>
        {sortArray?.map((obj) => (
          <div
            style={{
              padding: "15px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#191919",
              border: "1px solid #6C3EB8",
              borderRadius: 15,
            }}
            key={obj.id}
          >
            <img
              style={{ objectFit: "contain" }}
              src={obj.link}
              width={120}
              height={120}
            />
            <h3 style={{ width: 220 }}>{obj.name}</h3>
            <h2>{obj.count}</h2>
            <h3>{obj.price}руб.</h3>
            <div style={{ display: "flex", columnGap: 20 }}>
              <svg
                onClick={() => navigate(`/adminka/product-edit/${obj.id}`)}
                className={s.svg}
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
                  fill="#fff"
                />
              </svg>
              {obj?.count > 0 && (
                <svg
                  onClick={() => handleClearCountProduct(obj?.id)}
                  className={s.svg}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"
                    fill="#fff"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default AdminProducts;

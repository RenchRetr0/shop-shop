import { useNavigate } from "react-router-dom";
import { IProduct } from "../../store/slice/productsSlice";
import s from "./style.module.css";

interface IProductComponent {
  product: IProduct;
  callback: (obj: any) => void;
}

const ProductComponent = (props: IProductComponent) => {
  const { product, callback } = props;
  const navigate = useNavigate();

  return (
    <div className={s.product}>
      <div className={s.imgBlock}>
        <img
          className={s.product_img}
          src={product.link}
          width={300}
          height={280}
        />
        {sessionStorage.getItem("token") && product?.like[0] !== undefined ? (
          <>
            <svg
              onClick={() =>
                callback({
                  productId: product.id,
                  isLike: true,
                })
              }
              className={s.like}
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -910 960 960"
              width="48"
            >
              <path
                d="M716-120H272v-512l278-288 39 31q6 5 9 14t3 22v10l-45 211h299q24 0 42 18t18 42v81.839q0 7.161 1.5 14.661T915-461L789-171q-8.878 21.25-29.595 36.125Q738.689-120 716-120Zm-384-60h397l126-299v-93H482l53-249-203 214v427Zm0-427v427-427Zm-60-25v60H139v392h133v60H79v-512h193Z"
                fill={product?.like[0].like !== false ? "#6C3EB8" : "#4d4d4f"}
              />
            </svg>

            <svg
              onClick={() =>
                callback({
                  productId: product.id,
                  isLike: false,
                })
              }
              className={s.dislike}
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path
                d="M242-840h444v512L408-40l-39-31q-6-5-9-14t-3-22v-10l45-211H103q-24 0-42-18t-18-42v-81.839Q43-477 41.5-484.5T43-499l126-290q8.878-21.25 29.595-36.125Q219.311-840 242-840Zm384 60H229L103-481v93h373l-53 249 203-214v-427Zm0 427v-427 427Zm60 25v-60h133v-392H686v-60h193v512H686Z"
                fill={product?.like[0].like === false ? "#6C3EB8" : "#4d4d4f"}
              />
            </svg>
          </>
        ) : (
          sessionStorage.getItem("token") && (
            <>
              <svg
                onClick={() =>
                  callback({
                    productId: product.id,
                    isLike: true,
                  })
                }
                className={s.like}
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -910 960 960"
                width="48"
              >
                <path
                  d="M716-120H272v-512l278-288 39 31q6 5 9 14t3 22v10l-45 211h299q24 0 42 18t18 42v81.839q0 7.161 1.5 14.661T915-461L789-171q-8.878 21.25-29.595 36.125Q738.689-120 716-120Zm-384-60h397l126-299v-93H482l53-249-203 214v427Zm0-427v427-427Zm-60-25v60H139v392h133v60H79v-512h193Z"
                  fill="#4d4d4f"
                />
              </svg>

              <svg
                onClick={() =>
                  callback({
                    productId: product.id,
                    isLike: false,
                  })
                }
                className={s.dislike}
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path
                  d="M242-840h444v512L408-40l-39-31q-6-5-9-14t-3-22v-10l45-211H103q-24 0-42-18t-18-42v-81.839Q43-477 41.5-484.5T43-499l126-290q8.878-21.25 29.595-36.125Q219.311-840 242-840Zm384 60H229L103-481v93h373l-53 249 203-214v-427Zm0 427v-427 427Zm60 25v-60h133v-392H686v-60h193v512H686Z"
                  fill="#4d4d4f"
                />
              </svg>
            </>
          )
        )}
      </div>
      <div className={s.info}>
        <h4 className={s.product_title}>{product.name}</h4>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className={s.product_category}>{product.category.name}</span>
          <span className={s.product_price}>{product.price}₽</span>
        </div>
        <button
          onClick={() => navigate(`/card/${product.id}`)}
          style={{
            width: 200,
            padding: "10px 0",
            backgroundColor: "#6C3EB8",
            border: "none",
            borderRadius: 15,
            color: "#fff",
            margin: "10px 0 0",
            cursor: "pointer",
          }}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default ProductComponent;

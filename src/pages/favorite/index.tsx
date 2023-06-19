import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import {
  getFavorites,
  removeToFavorite,
} from "../../store/thunk/favoriteThunk";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const favorites = useSelector((state: RootState) => state.favorite.data);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch, isReload]);

  const handleAddFavorite = async (id: number) => {
    await dispatch(removeToFavorite(id));
    setIsReload(!isReload);
  };

  return (
    <main className="container">
      <section
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          rowGap: 20,
          padding: 20,
          backgroundColor: "#191919",
          borderRadius: 15,
        }}
      >
        <h2 style={{ textAlign: "center" }}>Избранные</h2>
        {favorites?.map((obj) => (
          <div
            style={{
              padding: "15px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "#212123",
              borderRadius: 15,
            }}
          >
            <img src={obj?.product?.link} alt="" width={120} height={100} />
            <h4>{obj?.product?.name}</h4>
            <div
              style={{ display: "flex", alignItems: "center", columnGap: 20 }}
            >
              <svg
                onClick={() => handleAddFavorite(obj?.product?.id)}
                style={{ cursor: "pointer" }}
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path
                  d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z"
                  fill="#6C3EB8"
                />
              </svg>

              <svg
                onClick={() => navigate(`/card/${obj?.product?.id}`)}
                className="details"
                style={{ cursor: "pointer" }}
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 -960 960 960"
                width="48"
              >
                <path
                  d="M453-280h60v-240h-60v240Zm26.982-314q14.018 0 23.518-9.2T513-626q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447-626q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"
                  fill="#fffff1"
                />
              </svg>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default FavoritesPage;

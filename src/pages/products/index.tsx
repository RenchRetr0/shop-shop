import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { addLike, getAllCategory, getAllProduct } from "../../store/thunk/productsThunk";
import Category from "../../components/category";
import SortListComponent from "../../components/sortList";
import { useSelector } from "react-redux";
import ProductComponent from "../../components/product";
import s from "./style.module.css";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products } = useSelector((state: RootState) => state.products);
  const filter = useSelector((state: RootState) => state.filter);
  const user = useSelector((state: RootState) => state.auth.data)
  const [isReload, setIsReload] = useState(false)

  useEffect(() => {
    dispatch(getAllCategory());
    const filtered = {
      categoryId: filter.category || undefined,
      sortFilter: filter.sort.value,
      userId: user?.user?.id ?? undefined,
    };
    dispatch(getAllProduct(filtered));
  }, [dispatch, filter, user, isReload]);

  const handledLike = async (obj: any) => {
    await dispatch(addLike(obj))
    setIsReload(!isReload)
  }

  return (
    <main className="container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Category />
        <SortListComponent />
      </div>

      <div className={s.inner}>
        {products.map((obj) => (
          <ProductComponent key={obj.id} product={obj} callback={handledLike} />
        ))}
      </div>
    </main>
  );
};

export default Products;

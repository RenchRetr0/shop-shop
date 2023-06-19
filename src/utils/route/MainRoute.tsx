import { Outlet } from "react-router-dom";
import Header from "../../components/header";

const MainRoute = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  );
}

export default MainRoute
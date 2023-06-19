import { Outlet } from "react-router-dom";
import HeaderAdminka from "../../components/headerAdmin";

const Adminka = () => {
  return (
    <main className="container">
      <HeaderAdminka />

      <Outlet />
    </main>
  );
};

export default Adminka;

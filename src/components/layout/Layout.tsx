import TopNav from "../common/TopNav";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <TopNav />
      <Outlet />
    </>
  );
}

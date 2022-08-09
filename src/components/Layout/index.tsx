import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import css from "./styles.module.css";

export const Layout = () => (
  <main className={css.main}>
    <Header />
    <Outlet />
  </main>
);

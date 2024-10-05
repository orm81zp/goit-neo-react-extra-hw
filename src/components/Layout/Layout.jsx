import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={css.layout}>
      <AppBar />
      <main>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;

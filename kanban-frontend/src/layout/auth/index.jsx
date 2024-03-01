import { Suspense, useState } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import style from "./style.module.css";
import SignUp from "../../components/auth/sign-up";
import Login from "../../components/auth/login";
import ArtSvg from "../../assets/Art.svg";
import BackSvg from "../../assets/Back.svg";

const Layout = () => {
  return (
    <div className={style.authContainer}>
      <div className={style.imageContainer}>
        <div>
          <img src={BackSvg} alt="" srcset="" />
          <img src={ArtSvg} alt="" srcset="" />
        </div>
        <div>
          <h2>Welcome aboard my friend </h2>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={style.childContainer}>
        <Outlet />
      </div>
    </div>
  );
};

const AuthLayout = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "register",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <Suspense fallback={<SyncLoader />}>{routing}</Suspense>;
};

export default AuthLayout;

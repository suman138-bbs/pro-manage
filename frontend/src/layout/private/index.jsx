import { NavLink, Outlet, useNavigate, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { SyncLoader } from "react-spinners";

import Board from "../../components/board";
import Analytics from "../../components/analytics";
import style from "./style.module.css";
import Settings from "../../components/settings";
import axios from "../../api/axios";

const Layout = () => {
  const navigate = useNavigate();
  const navigation = [
    {
      name: "Board",
      href: "board",
    },
    {
      name: "Analytics",
      href: "analytics",
    },
    {
      name: "Settings",
      href: "settings",
    },
  ];
  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      navigate("/auth/login");
    } catch (error) {
      console.log("ERROR");
    }
  };
  return (
    <div className={style.layoutContainer}>
      <div className={style.navContainer}>
        <div className={style.logo}>
          <h1>QUIZZIE</h1>
        </div>
        <div className={style.nav}>
          {navigation.map((nav) => {
            return (
              <NavLink to={nav.href} key={nav.href} className={style.navLink}>
                <h4> {nav.name}</h4>
              </NavLink>
            );
          })}
        </div>
        <div className={style.logoutContainer}>
          <hr />
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className={style.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

const PrivateLayout = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "board",
          element: <Board />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return <Suspense fallback={<SyncLoader />}>{routing}</Suspense>;
};

export default PrivateLayout;

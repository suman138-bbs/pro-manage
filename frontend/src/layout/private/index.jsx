import { NavLink, Outlet, useNavigate, useRoutes } from "react-router-dom";
import { Suspense, useState } from "react";
import { SyncLoader } from "react-spinners";

import Board from "../../components/board";
import Analytics from "../../components/analytics";
import style from "./style.module.css";
import Settings from "../../components/settings";
import axios from "../../api/axios";
import Logo from "../../assets/codesandbox.svg";
import BoardIcon from "../../assets/board.svg";
import DataBaseIcon from "../../assets/database.svg";
import SettingIcon from "../../assets/settings.svg";
import LogoutIcon from "../../assets/Logout.svg";

const Layout = () => {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false);
  const navigation = [
    {
      name: "Board",
      href: "board",
      src: BoardIcon,
    },
    {
      name: "Analytics",
      href: "analytics",
      src: DataBaseIcon,
    },
    {
      name: "Settings",
      href: "settings",
      src: SettingIcon,
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
  const handleSetLogOut = () => {
    setIsLogout(!isLogout);
  };
  return (
    <div className={style.layoutContainer}>
      <div className={style.navContainer}>
        <div>
          <div className={style.logo}>
            <img src={Logo} alt="" />
            <h3>Pro Manage</h3>
          </div>
          <div className={style.nav}>
            {navigation.map((nav) => {
              return (
                <NavLink
                  to={nav.href}
                  key={nav.href}
                  className={({ isActive }) => {
                    return isActive ? style.active : style.navLink;
                  }}
                >
                  <img src={nav.src} alt="" />
                  <h4> {nav.name}</h4>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className={style.logoutContainer}>
          <button
            onClick={() => {
              handleSetLogOut();
            }}
          >
            <img src={LogoutIcon} alt="" />
            <p>Logout</p>
          </button>
        </div>
      </div>
      <div className={style.outlet}>
        <Outlet />
      </div>
      {isLogout && (
        <div className={style.confirmLogOut}>
          <div>
            <h4>Are you sure you want to Logout?</h4>
            <div>
              <button onClick={handleLogout}>Yes, Logout</button>
            </div>
            <div>
              <button
                onClick={() => {
                  setIsLogout(!isLogout);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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

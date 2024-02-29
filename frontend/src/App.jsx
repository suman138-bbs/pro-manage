import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Suspense, useEffect } from "react";

import AuthLayout from "./layout/auth";
import PrivateLayout from "./layout/private";

import useAuth from "./hooks/useAuth";
import useRefToken from "./hooks/useRefToken";
import SharedTodo from "./components/todo";

function App() {
  const { auth } = useAuth();
  const refresh = useRefToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      const currentRoute = window.location.pathname;

      if (!auth.name) {
        const path = pathname.split("/").includes("auth");

        if (currentRoute.startsWith("/todo")) {
          navigate(currentRoute);
          return;
        }

        if (currentRoute.startsWith("/auth")) {
          navigate(currentRoute);
          return;
        }

        if (path) {
          navigate("/auth/login");
          return;
        }
        const token = await refresh();
        if (!token) {
          navigate("auth/login");
          return;
        }
        if (currentRoute.startsWith("/app")) {
          navigate(currentRoute);
        } else {
          navigate("/app/board");
        }
      } else {
        navigate("/auth/login");
      }
    };
    handleAuth();
  }, []);
  const routing = useRoutes([
    {
      path: "/auth/*",
      element: <AuthLayout />,
    },
    {
      path: "/app/*",
      element: <PrivateLayout />,
    },
    {
      path: "/todo/:id",
      element: <SharedTodo />,
    },
  ]);

  return <Suspense fallback={"Loading....."}>{routing}</Suspense>;
}

export default App;

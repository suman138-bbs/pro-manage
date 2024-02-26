import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useRefToken = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  if (!auth?.user?.name) {
    navigate("/auth/login");
  }
  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      setAuth(response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      if (!error?.data?.success) {
        navigate("/auth/login");
      }
    }
  };
  return refresh;
};

export default useRefToken;

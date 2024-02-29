import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useRefToken = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      setAuth(response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  };
  return refresh;
};

export default useRefToken;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "../../../api/axios";
import style from "./style.module.css";
import useAuth from "../../../hooks/useAuth";
import EmailIcon from "../../../assets/Email.svg";
import LockIcon from "../../../assets/lock.svg";
import ViewIcon from "../../../assets/view.svg";
import Rolling from "../../../assets/Rolling.svg";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("DATA", data);
    if (!data.email && !data.password) {
      toast.error("Please provide email and password");
      setIsLoading(false);
      return;
    } else if (!isValidEmail(data.email)) {
      toast.error("Please provide a valid email address");
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post("/auth/login", data);
      if (res?.data) {
        setAuth(res.data);
        navigate("/app/board");
        if (auth?.user) {
          toast.success("User Logged In Successfully");
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message || "Invalid User");
    }
  };

  return (
    <div className={style.formContainer}>
      <h1>Login</h1>
      <form>
        <div className={style.inputContainer}>
          <img src={EmailIcon} alt="" />
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            placeholder="Email"
          />
        </div>
        <div className={style.passwordContainer}>
          <div className={style.inputContainer}>
            <img src={LockIcon} alt="" />
            <input
              type={visible ? "text" : "password"}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              placeholder="Password"
            />
          </div>
          <img
            src={ViewIcon}
            alt=""
            onClick={() => {
              setVisible(!visible);
            }}
          />
        </div>

        <div className={style.buttonContainer}>
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {isLoading ? <img src={Rolling} /> : null} Log in
          </button>
          <p>Have no account yet?</p>
          <button
            onClick={() => {
              navigate("/auth/register");
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "../login/style.module.css";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import EmailIcon from "../../../assets/Email.svg";
import ViewIcon from "../../../assets/view.svg";
import NameIcon from "../../../assets/Name.svg";
import LockIcon from "../../../assets/lock.svg";
import Rolling from "../../../assets/Rolling.svg";

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!data.name) {
      toast.error("Please provide Valid Name");
      setIsLoading(false);
      return;
    } else if (!data.email && !data.password) {
      toast.error("Please provide email and password");
      setIsLoading(false);
      return;
    } else if (!isValidEmail(data.email)) {
      toast.error("Please provide a valid email address");
      setIsLoading(false);
      return;
    } else if (data.password !== data.confirmPassword) {
      toast.error(
        "Password and Confirm Password do not match. Please make sure they are the same"
      );
      setIsLoading(false);
      return;
    }
    try {
      const { name, email, password } = data;
      const res = await axios.post("/auth/signup", { name, email, password });
      if (res?.data.success) {
        setIsLoading(false);
        navigate("/auth/login");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message || "Invalid User");
    }
  };
  return (
    <div className={style.formContainer}>
      <h1>Register</h1>
      <form>
        <div className={style.inputContainer}>
          <img src={NameIcon} alt="" />
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            placeholder="Name"
          />
        </div>
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
              placeholder="Confirm Password"
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
        <div className={style.passwordContainer}>
          <div className={style.inputContainer}>
            <img src={LockIcon} alt="" />
            <input
              type={visible ? "text" : "password"}
              onChange={(e) => {
                setData({ ...data, confirmPassword: e.target.value });
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
            {isLoading ? <img src={Rolling} /> : null} Register
          </button>
          <p>Have an account?</p>
          <button
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

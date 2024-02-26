import style from "./style.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";

import ViewIcon from "../../assets/view.svg";
import NameIcon from "../../assets/Name.svg";
import LockIcon from "../../assets/lock.svg";
import Rolling from "../../assets/Rolling.svg";
import useAuth from "../../hooks/useAuth";

const Settings = () => {
  const { auth } = useAuth();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    setIsLoading(true);
    if (!data.oldPassword) {
      toast.error("Please provide Old password");
      setIsLoading(false);
      return;
    } else if (!data.newPassword) {
      toast.error("Provide a New Password also");
      setIsLoading(false);
      return;
    }
    try {
      const { oldPassword, newPassword } = data;

      const res = await axios.post("/app/update-profile", {
        oldPassword,
        newPassword,
      });
      if (res?.data.success) {
        setIsLoading(false);
      }
      toast.success(res.data.message);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message || "Invalid User");
    }
  };

  return (
    <div className={style.formContainer}>
      <h2>Settings</h2>
      <form>
        <div className={style.inputContainer}>
          <img src={NameIcon} alt="" />
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            value={auth?.user?.name}
            placeholder="Name"
            disabled
          />
        </div>

        <div className={style.passwordContainer}>
          <div className={style.inputContainer}>
            <img src={LockIcon} alt="" />
            <input
              type={visible ? "text" : "password"}
              onChange={(e) => {
                setData({ ...data, oldPassword: e.target.value });
              }}
              placeholder="Old Password"
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
                setData({ ...data, newPassword: e.target.value });
              }}
              placeholder="New Password"
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
            {isLoading ? <img src={Rolling} /> : null} Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;

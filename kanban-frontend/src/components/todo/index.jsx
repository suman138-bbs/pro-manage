import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Logo from "../../assets/codesandbox.svg";
import style from "./style.module.css";
import axios from "../../api/axios";
import RedDot from "../../assets/Red.svg";
import GreenDot from "../../assets/Green.svg";

const SharedTodo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSucess] = useState(true);
  const [todo, setTodo] = useState([]);

  const getMonthName = (month) => {
    switch (parseInt(month)) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return "Invalid Month";
    }
  };

  const addOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const handleMarkCount = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isMarked) {
        count++;
      }
    }
    return count;
  };

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await axios.get(`app/get-todo/${id}`);
      console.log(res.data);
      if (res.data.success) {
        setTodo(res.data.todo);
        setLoading(false);
        setSucess(res.data.success);
      } else {
        setTodo(res.data.message);
        setLoading(false);
        setSucess(res.data.success);
      }
    };
    fetchTodo();
  }, []);
  if (!success) {
    return <h2>Opps! {todo}</h2>;
  }
  return (
    <div className={style.mainContainer}>
      <div>
        <img src={Logo} alt="" className={style.logo} />
        <h3>Pro Manage</h3>
      </div>

      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <div className={style.checkListContainer} key={todo._id}>
          <div>
            <div>
              <div className={style.priorityContainer}>
                {todo.priority === "high" ? (
                  <img src={RedDot} alt="" />
                ) : (
                  <img src={GreenDot} alt="" />
                )}
                <p>{todo.priority} priority</p>
              </div>
              <h2>{todo.title}</h2>
            </div>
            <div>
              <div className={style.checkListCount}>
                <div>
                  <p>
                    {" "}
                    CheckList({handleMarkCount(todo.checklist)}/
                    {todo.checklist.length})
                  </p>
                  <ul>
                    {todo.checklist.map((list, index) => {
                      return (
                        <li key={list._id} className={style.checklist_list}>
                          <input type="checkbox" checked={list.isMarked} />
                          <span>{list.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className={style.status_change_btn}>
                <div>
                  {todo?.dueDate && (
                    <>
                      <h3>Due Date</h3>
                      <button
                        className={style.dueDateBtn}
                        style={
                          new Date(todo.dueDate) < new Date()
                            ? {
                                backgroundColor: "#CF3636",
                                color: "white",
                              }
                            : {}
                        }
                      >
                        {`${getMonthName(
                          todo.dueDate.split("-")[1]
                        )} ${addOrdinalSuffix(
                          parseInt(todo.dueDate.split("-")[2])
                        )}`}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedTodo;

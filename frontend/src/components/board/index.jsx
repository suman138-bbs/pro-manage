import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import style from "./style.module.css";

const Board = () => {
  const date = new Date(Date.now());
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const year = date.getFullYear();
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
  const formattedDate = `${addOrdinalSuffix(day)} ${month}, ${year}`;

  // const {
  //   auth: {
  //     user: { name },
  //   },
  // } = useAuth();

  return (
    <div className={style.boardContainer}>
      <div className={style.boardDetailContainer}>
        <div>
          <h3>Welcome! {name}</h3>
          <h2>Board</h2>
        </div>
        <div className={style.dateFilterContainer}>
          <p>{formattedDate}</p>
          <h5>This week</h5>
        </div>
      </div>
      <div className={style.todosTypeContainer}>
        <div>
          <h1>Backlog</h1>
        </div>
        <div>
          <h1>To-do</h1>
        </div>
        <div>
          <h1>In progress</h1>
        </div>
        <div>
          <h1>Done</h1>
        </div>
      </div>
    </div>
  );
};
export default Board;

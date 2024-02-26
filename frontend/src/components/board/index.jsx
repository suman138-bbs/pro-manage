import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import style from "./style.module.css";
import ColVector from "../../assets/Vector.svg";
import RedDot from "../../assets/Red.svg";
import ThreeDot from "../../assets/Dot3.svg";
import GreenDot from "../../assets/Green.svg";
import DeleteIcon from "../../assets/Delete.svg";
import DownArrow from "../../assets/DownArrow.svg";
import UpArrow from "../../assets/UpArrow.svg";

import axios from "../../api/axios";

const Board = () => {
  const [listDate, setListDate] = useState("today");
  const [createTodo, setCreateTodo] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    priority: "",
    checklist: [],
    dueDate: "",
  });

  const [editTodoData, setEditTodoData] = useState([]);
  const [listDateOpen, setListDateOpen] = useState(false);

  const [backlogListOpen, setBacklogListOpen] = useState([]);
  const [todoListOpen, setTodoListOpen] = useState([]);
  const [progressListOpen, setProgressListOpen] = useState([]);
  const [doneListOpen, setDoneListOpen] = useState([]);

  const dateRef = useRef(null);
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

  const [todoTodos, setTodoTodos] = useState([]);
  const [backlogTodos, setBacklogTodos] = useState([]);
  const [progressTodos, setProgressTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const fetchWithSortData = async () => {
    const todoTodos = await axios.get(`app/get-todo-todos/${listDate}`);
    const doneTodos = await axios.get(`app/get-done-todos/${listDate}`);
    const progressTodos = await axios.get(`app/get-progress-todos/${listDate}`);
    const backlogTodos = await axios.get(`app/get-backlog-todos/${listDate}`);
    setTodoTodos(todoTodos.data.todos);
    setCompletedTodos(doneTodos.data.todos);
    setProgressTodos(progressTodos.data.todos);
    setBacklogTodos(backlogTodos.data.todos);
  };

  const handleSubmitCreateTodo = useCallback(async () => {
    if (todo.title.length === 0) {
      toast.error("Todo Name cann't be empty");
      return;
    }
    if (todo.priority.length === 0) {
      toast.error("select the priority");
      return;
    }
    if (todo.checklist.length === 0) {
      toast.error("Create at least one checklist");
      return;
    }

    const checklistEmpty = todo.checklist.some(
      (item) => item.name.trim() === ""
    );
    if (checklistEmpty) {
      toast.error("Checklist field shouldn't be empty");
      return;
    }

    const res = await axios.post("app/create-todo", todo);

    toast.success(res.data.message);
    setTodo({
      title: "",
      priority: "",
      checklist: [],
    });
    setCreateTodo(!createTodo);
  }, [todo]);

  const handleMarkCount = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isMarked) {
        count++;
      }
    }
    return count;
  };
  const handleCheckedChange = async (...data) => {
    if (data[1] === "checkbox") {
      data[0].checklist[data[2]].isMarked =
        !data[0].checklist[data[2]].isMarked;
      const res = await axios.put("app/update-todo", data[0]);
      fetchWithSortData();
    } else if (data[1] === "progress") {
      data[0].status = "progress";
      await axios.put("app/update-todo", data[0]);

      fetchWithSortData();
    } else if (data[1] === "todo") {
      data[0].status = "todo";
      await axios.put("app/update-todo", data[0]);
      fetchWithSortData();
    } else if (data[1] === "done") {
      data[0].status = "done";
      await axios.put("app/update-todo", data[0]);
      fetchWithSortData();
    } else if (data[1] === "backlog") {
      data[0].status = "backlog";
      await axios.put("app/update-todo", data[0]);
      fetchWithSortData();
    }
  };

  useEffect(() => {
    fetchWithSortData(listDate);
  }, [listDate, todo]);

  const handleCreateTodo = () => {
    setCreateTodo(true);
  };

  const handleDatePicker = () => {
    console.log(dateRef);
    dateRef.current.onClick();
  };

  const handleAddChecklist = () => {
    setTodo({
      ...todo,
      checklist: [...todo.checklist, { name: "", isMarked: false }],
    });
  };

  const handleChecklistChange = (e, index) => {
    const { type, value } = e.target;

    if (type === "text") {
      setTodo((prevTodo) => {
        const updatedChecklist = [...prevTodo.checklist];
        updatedChecklist[index] = {
          ...updatedChecklist[index],
          name: value,
        };
        return { ...prevTodo, checklist: updatedChecklist };
      });
    }
    if (type === "checkbox") {
      setTodo((prevTodo) => {
        const updatedChecklist = [...prevTodo.checklist];
        updatedChecklist[index] = {
          ...updatedChecklist[index],
          isMarked: !updatedChecklist[index].isMarked,
        };
        return { ...prevTodo, checklist: updatedChecklist };
      });
    }
  };

  const handlePriority = (type) => {
    setTodo({ ...todo, priority: type });
  };

  const handleTodoname = (value) => {
    setTodo({ ...todo, title: value });
  };
  const handleRemoveCheckList = (index) => {
    const arr = todo.checklist.filter((list, i) => {
      return i !== index;
    });
    setTodo({ ...todo, checklist: arr });
  };

  const handleSetListDate = (type) => {
    setListDate(type);
  };

  console.log(editTodoData);

  return (
    <>
      <div className={style.boardContainer}>
        <div className={style.boardDetailContainer}>
          <div>
            <h3>Welcome! {name}</h3>
            <h2>Board</h2>
          </div>
          <div className={style.dateFilterContainer}>
            <p>{formattedDate}</p>
            <div className={style.todo_list_date}>
              <h3>{listDate}</h3>
              {listDateOpen && (
                <div>
                  <h3
                    onClick={() => {
                      handleSetListDate("today");
                      setListDateOpen(!listDateOpen);
                    }}
                  >
                    Today
                  </h3>
                  <h3
                    onClick={() => {
                      handleSetListDate("this week");
                      setListDateOpen(!listDateOpen);
                    }}
                  >
                    This Week
                  </h3>
                  <h3
                    onClick={() => {
                      handleSetListDate("this month");
                      setListDateOpen(!listDateOpen);
                    }}
                  >
                    This Month
                  </h3>
                </div>
              )}
              <img
                src={DownArrow}
                alt=""
                onClick={() => {
                  setListDateOpen(!listDateOpen);
                }}
              />
            </div>
          </div>
        </div>
        <div className={style.todosTypeContainer}>
          <div className={style.backlogContainer}>
            <div>
              <h4>Backlog</h4>
              <img
                src={ColVector}
                alt=""
                onClick={() => {
                  setBacklogListOpen([]);
                }}
              />
            </div>
            {backlogTodos.map((todo, inx) => {
              return (
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
                      <h3>{todo.title}</h3>
                    </div>
                    <div className={style.threeDotContainer}>
                      {editTodoData.title === todo.title && (
                        <div>
                          <li>Edit</li>
                          <li>Share</li>
                          <li>Delete</li>
                        </div>
                      )}
                      <img
                        src={ThreeDot}
                        alt=""
                        onClick={() => {
                          editTodoData.title
                            ? setEditTodoData({})
                            : setEditTodoData(todo);
                        }}
                      />
                    </div>
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
                          {backlogListOpen.includes(todo.title) &&
                            todo.checklist.map((list, index) => {
                              return (
                                <li
                                  key={list._id}
                                  className={style.checklist_list}
                                >
                                  <input
                                    type="checkbox"
                                    defaultChecked={list.isMarked}
                                    onChange={() => {
                                      handleCheckedChange(
                                        todo,
                                        "checkbox",
                                        index
                                      );
                                    }}
                                  />
                                  <span>{list.name}</span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      {backlogListOpen.includes(todo.title) ? (
                        <button
                          onClick={() => {
                            setBacklogListOpen((prev) => {
                              return prev.filter((title) => {
                                return title !== todo.title;
                              });
                            });
                          }}
                        >
                          <img src={UpArrow} alt="" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setBacklogListOpen([
                              ...backlogListOpen,
                              todo.title,
                            ]);
                          }}
                        >
                          <img src={DownArrow} alt="" />
                        </button>
                      )}
                    </div>

                    <div className={style.status_change_btn}>
                      {todo?.dueDate && <button>{todo.dueDate}</button>}
                      <div>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "progress");
                          }}
                        >
                          Progress
                        </button>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "todo");
                          }}
                        >
                          Todo
                        </button>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "done");
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.todoContainer}>
            <div>
              <h4>To do</h4>
              <div className={style.creteTodoContainer}>
                <button onClick={handleCreateTodo}>+</button>
                <img
                  src={ColVector}
                  alt=""
                  onClick={() => {
                    setTodoListOpen([]);
                  }}
                />
              </div>
            </div>
            {todoTodos.map((todo) => {
              return (
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
                      <h3>{todo.title}</h3>
                    </div>
                    <div className={style.threeDotContainer}>
                      {editTodoData.title === todo.title && (
                        <div>
                          <li>Edit</li>
                          <li>Share</li>
                          <li>Delete</li>
                        </div>
                      )}
                      <img
                        src={ThreeDot}
                        alt=""
                        onClick={() => {
                          editTodoData.title
                            ? setEditTodoData({})
                            : setEditTodoData(todo);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className={style.checkListCount}>
                      <div>
                        <p>
                          CheckList({handleMarkCount(todo.checklist)}/
                          {todo.checklist.length})
                        </p>
                        <ul>
                          {todoListOpen.includes(todo.title) &&
                            todo.checklist.map((list, index) => {
                              return (
                                <li
                                  key={list._id}
                                  className={style.checklist_list}
                                >
                                  <input
                                    type="checkbox"
                                    defaultChecked={list.isMarked}
                                    onChange={() => {
                                      handleCheckedChange(
                                        todo,
                                        "checkbox",
                                        index
                                      );
                                    }}
                                  />
                                  <span>{list.name}</span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      {todoListOpen.includes(todo.title) ? (
                        <button
                          onClick={() => {
                            setTodoListOpen((prev) => {
                              return prev.filter((title) => {
                                return title !== todo.title;
                              });
                            });
                          }}
                        >
                          <img src={UpArrow} alt="" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setTodoListOpen([...todoListOpen, todo.title]);
                          }}
                        >
                          <img src={DownArrow} alt="" />
                        </button>
                      )}
                    </div>
                    <div className={style.status_change_btn}>
                      {todo?.dueDate && <button>{todo.dueDate}</button>}
                      <div>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "backlog");
                          }}
                        >
                          Backlog
                        </button>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "progress");
                          }}
                        >
                          Progress
                        </button>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "done");
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* In Progress  */}
          <div>
            <div>
              <h4>In progress</h4>
              <img
                src={ColVector}
                alt=""
                onClick={() => {
                  setProgressListOpen([]);
                }}
              />
            </div>
            {progressTodos.map((todo) => {
              return (
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
                      <h3>{todo.title}</h3>
                    </div>
                    <div className={style.threeDotContainer}>
                      {editTodoData.title === todo.title && (
                        <div>
                          <li>Edit</li>
                          <li>Share</li>
                          <li>Delete</li>
                        </div>
                      )}
                      <img
                        src={ThreeDot}
                        alt=""
                        onClick={() => {
                          editTodoData.title
                            ? setEditTodoData({})
                            : setEditTodoData(todo);
                        }}
                      />
                    </div>
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
                          {progressListOpen.includes(todo.title) &&
                            todo.checklist.map((list, index) => {
                              return (
                                <li
                                  key={list._id}
                                  className={style.checklist_list}
                                >
                                  <input
                                    type="checkbox"
                                    defaultChecked={list.isMarked}
                                    onChange={() => {
                                      handleCheckedChange(
                                        todo,
                                        "checkbox",
                                        index
                                      );
                                    }}
                                  />
                                  <span>{list.name}</span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      {progressListOpen.includes(todo.title) ? (
                        <button
                          onClick={() => {
                            setProgressListOpen((prev) => {
                              return prev.filter((title) => {
                                return title !== todo.title;
                              });
                            });
                          }}
                        >
                          <img src={UpArrow} alt="" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setProgressListOpen([
                              ...progressListOpen,
                              todo.title,
                            ]);
                          }}
                        >
                          <img src={DownArrow} alt="" />
                        </button>
                      )}
                    </div>
                    <div className={style.status_change_btn}>
                      {todo?.dueDate && <button>{todo.dueDate}</button>}
                      <div>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "backlog");
                          }}
                        >
                          Backlog
                        </button>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "todo");
                          }}
                        >
                          Todo
                        </button>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "done");
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div>
              <h4>Done</h4>
              <img
                src={ColVector}
                alt=""
                onClick={() => {
                  setDoneListOpen([]);
                }}
              />
            </div>
            {completedTodos.map((todo) => {
              return (
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
                      <h3>{todo.title}</h3>
                    </div>
                    <div className={style.threeDotContainer}>
                      {editTodoData.title === todo.title && (
                        <div>
                          <li>Edit</li>
                          <li>Share</li>
                          <li>Delete</li>
                        </div>
                      )}
                      <img
                        src={ThreeDot}
                        alt=""
                        onClick={() => {
                          editTodoData.title
                            ? setEditTodoData({})
                            : setEditTodoData(todo);
                        }}
                      />
                    </div>
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
                          {doneListOpen.includes(todo.title) &&
                            todo.checklist.map((list, index) => {
                              return (
                                <li
                                  key={list._id}
                                  className={style.checklist_list}
                                >
                                  <input
                                    type="checkbox"
                                    defaultChecked={list.isMarked}
                                    onChange={() => {
                                      handleCheckedChange(
                                        todo,
                                        "checkbox",
                                        index
                                      );
                                    }}
                                  />
                                  <span>{list.name}</span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      {doneListOpen.includes(todo.title) ? (
                        <button
                          onClick={() => {
                            setDoneListOpen((prev) => {
                              return prev.filter((title) => {
                                return title !== todo.title;
                              });
                            });
                          }}
                        >
                          <img src={UpArrow} alt="" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setDoneListOpen([...doneListOpen, todo.title]);
                          }}
                        >
                          <img src={DownArrow} alt="" />
                        </button>
                      )}
                    </div>
                    <div className={style.status_change_btn}>
                      {todo?.dueDate && <button>{todo.dueDate}</button>}
                      <div>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "backlog");
                          }}
                        >
                          Backlog
                        </button>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "todo");
                          }}
                        >
                          Todo
                        </button>
                        <button
                          onClick={() => {
                            handleCheckedChange(todo, "progress");
                          }}
                        >
                          Progress
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {createTodo && (
          <div className={style.todo_input_container}>
            <div>
              <div className={style.todo_title_container}>
                <label htmlFor="">
                  Title <span className={style.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  onChange={(e) => {
                    handleTodoname(e.target.value);
                  }}
                />
              </div>
              <div className={style.priority_container}>
                <label htmlFor="">
                  Select Priority <span className={style.required}>*</span>
                </label>
                <button
                  onClick={() => {
                    handlePriority("high");
                  }}
                  style={
                    todo.priority === "high"
                      ? { backgroundColor: "#cccccc" }
                      : {}
                  }
                >
                  <img src={RedDot} alt="" />
                  <span>HIGH PRIORITY</span>
                </button>
                <button
                  onClick={() => {
                    handlePriority("moderate");
                  }}
                  style={
                    todo.priority === "moderate"
                      ? { backgroundColor: "#cccccc" }
                      : {}
                  }
                >
                  <img src={GreenDot} alt="" />
                  <span> MODERATE PRIORITY</span>
                </button>
                <button
                  onClick={() => {
                    handlePriority("low");
                  }}
                  style={
                    todo.priority === "low"
                      ? { backgroundColor: "#cccccc" }
                      : {}
                  }
                >
                  <img src={GreenDot} alt="" />
                  <span> LOW PRIORITY</span>
                </button>
              </div>
              <div className={style.checklist_container}>
                <h4>
                  Checklist ({handleMarkCount(todo.checklist)}/
                  {todo.checklist.length}){" "}
                  <span className={style.required}>*</span>
                </h4>
                <div className={style.checklist_input_container}>
                  {todo.checklist.map((list, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="checkbox"
                          value={list.isMarked}
                          onChange={(e) => {
                            handleChecklistChange(e, index);
                          }}
                        />
                        <input
                          type="text"
                          value={list.name}
                          placeholder="Add a task"
                          onChange={(e) => {
                            handleChecklistChange(e, index);
                          }}
                        />
                        <img
                          src={DeleteIcon}
                          alt=""
                          onClick={() => {
                            handleRemoveCheckList(index);
                          }}
                        />
                      </div>
                    );
                  })}
                  <section className={style.checklist_add_btn}>
                    <button onClick={handleAddChecklist}>
                      <span>+</span>
                      <span>Add New</span>
                    </button>
                  </section>
                </div>
              </div>
              <div className={style.button_container}>
                <div>
                  {/* <input type="date" ref={dateRef} /> */}
                  <button onClick={handleDatePicker}>Select Due Date</button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setCreateTodo(false);
                      setTodo({
                        title: "",
                        priority: "",
                        checklist: [],
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={handleSubmitCreateTodo}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Board;

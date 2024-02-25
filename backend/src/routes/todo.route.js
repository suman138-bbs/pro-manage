import { Router } from "express";
import {
  createTodo,
  getTodoTodos,
  getDoneTodos,
  getProgressTodos,
  getBacklogTodos,
  updateTodo,
  getuBacklogTodos,
  getuDoneTodos,
  getuProgressTodos,
  getuTodoTodos,
} from "../controllers/todo.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const todoRouter = Router();

todoRouter.post("/create-todo", isLoggedIn, createTodo);
todoRouter.get("/get-todo-todos/:listDate", isLoggedIn, getTodoTodos);
todoRouter.get("/get-done-todos/:listDate", isLoggedIn, getDoneTodos);
todoRouter.get("/get-progress-todos/:listDate", isLoggedIn, getProgressTodos);
todoRouter.get("/get-backlog-todos/:listDate", isLoggedIn, getBacklogTodos);

todoRouter.get("/getu-todo-todos/:listDate", isLoggedIn, getuTodoTodos);
todoRouter.get("/getu-done-todos/:listDate", isLoggedIn, getuDoneTodos);
todoRouter.get("/getu-progress-todos/:listDate", isLoggedIn, getuProgressTodos);
todoRouter.get("/getu-backlog-todos/:listDate", isLoggedIn, getuBacklogTodos);

todoRouter.put("/update-todo", isLoggedIn, updateTodo);

export default todoRouter;

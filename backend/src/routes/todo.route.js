import { Router } from "express";
import {
  createTodo,
  getTodoTodos,
  getDoneTodos,
  getProgressTodos,
  getBacklogTodos,
  updateTodo,
  deleteTodo,
  updateProfile,
} from "../controllers/todo.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const todoRouter = Router();

todoRouter.post("/create-todo", isLoggedIn, createTodo);
todoRouter.get("/get-todo-todos/:listDate", isLoggedIn, getTodoTodos);
todoRouter.get("/get-done-todos/:listDate", isLoggedIn, getDoneTodos);
todoRouter.get("/get-progress-todos/:listDate", isLoggedIn, getProgressTodos);
todoRouter.get("/get-backlog-todos/:listDate", isLoggedIn, getBacklogTodos);

todoRouter.put("/update-todo", isLoggedIn, updateTodo);
todoRouter.put("/delete-todo", isLoggedIn, deleteTodo);
todoRouter.post("/update-profile", isLoggedIn, updateProfile);

export default todoRouter;

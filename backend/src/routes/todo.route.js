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
  getAnalytics,
  getTodoById,
} from "../controllers/todo.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const todoRouter = Router();

todoRouter.get("/get-todo-todos/:listDate", isLoggedIn, getTodoTodos);
todoRouter.get("/get-done-todos/:listDate", isLoggedIn, getDoneTodos);
todoRouter.get("/get-progress-todos/:listDate", isLoggedIn, getProgressTodos);
todoRouter.get("/get-backlog-todos/:listDate", isLoggedIn, getBacklogTodos);
todoRouter.get("/get-analytics", isLoggedIn, getAnalytics);

todoRouter.get("/get-todo/:id", getTodoById);

todoRouter.put("/update-todo", isLoggedIn, updateTodo);
todoRouter.put("/delete-todo", isLoggedIn, deleteTodo);

todoRouter.post("/create-todo", isLoggedIn, createTodo);
todoRouter.post("/update-profile", isLoggedIn, updateProfile);

export default todoRouter;

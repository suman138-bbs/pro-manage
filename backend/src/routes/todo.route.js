import { Router } from "express";
import { createTodo } from "../controllers/todo.controller.js";
const todoRouter = Router();

todoRouter.post("/create-todo", createTodo);

export default todoRouter;

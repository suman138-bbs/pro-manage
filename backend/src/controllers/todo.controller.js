import Todo from "../models/todo.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const createTodo = asyncHandler(async (req, res) => {
  const data = req.body;
  const { title } = data;
  const duplicateTodo = await Todo.findOne({ title });
  if (duplicateTodo) {
    throw new CustomError("Todo name already exist", 400);
  }
  const newTodo = await Todo.create(data);

  res.status(200).json({ sucess: true, newTodo });
});

export const updateTodo = asyncHandler((req, res) => {});

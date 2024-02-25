import Todo from "../models/todo.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import User from "../models/user.model.js";

export const createTodo = asyncHandler(async (req, res) => {
  const data = req.body;

  const { title } = data;
  const duplicateTodo = await Todo.findOne({ title });
  if (duplicateTodo) {
    throw new CustomError("Todo name already exist", 400);
  }

  const newTodo = await Todo.create(data);

  await User.findByIdAndUpdate(req.user._id, {
    $push: { todos: { todoId: newTodo._id } },
  });

  res
    .status(200)
    .json({ sucess: true, newTodo, message: "Todo list created successfully" });
});

export const getTodoTodos = asyncHandler(async (req, res) => {
  const { listDate } = req.params;
  const userId = req.user._id;

  let todos;

  switch (listDate) {
    case "today":
      todos = await Todo.find({
        status: "todo",
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    case "this week":
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate());
      todos = await Todo.find({
        status: "todo",
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(endOfMonth.getDate() - 1);
      todos = await Todo.find({
        status: "todo",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});

export const getProgressTodos = asyncHandler(async (req, res) => {
  const { listDate } = req.params;
  const userId = req.user._id;

  let todos;

  switch (listDate) {
    case "today":
      todos = await Todo.find({
        status: "progress",
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    case "this week":
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate());
      todos = await Todo.find({
        status: "progress",
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(endOfMonth.getDate() - 1);
      todos = await Todo.find({
        status: "progress",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});

export const getDoneTodos = asyncHandler(async (req, res) => {
  const { listDate } = req.params;
  const userId = req.user._id;

  let todos;

  switch (listDate) {
    case "today":
      todos = await Todo.find({
        status: "done",
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    case "this week":
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate());
      todos = await Todo.find({
        status: "done",
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(endOfMonth.getDate() - 1);
      todos = await Todo.find({
        status: "done",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});

export const getBacklogTodos = asyncHandler(async (req, res) => {
  const { listDate } = req.params;
  const userId = req.user._id;

  let todos;

  switch (listDate) {
    case "today":
      todos = await Todo.find({
        status: "backlog",
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    case "this week":
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate());
      todos = await Todo.find({
        status: "backlog",
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(endOfMonth.getDate() - 1);
      todos = await Todo.find({
        status: "backlog",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: 1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});
/////

export const getuTodoTodos = asyncHandler(async (req, res) => {
  const { listDate } = req.params;
  const userId = req.user._id;

  let todos;

  switch (listDate) {
    case "today":
      todos = await Todo.find({
        status: "todo",
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    case "this week":
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate());
      todos = await Todo.find({
        status: "todo",
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(endOfMonth.getDate() - 1);
      todos = await Todo.find({
        status: "todo",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});

export const getuProgressTodos = asyncHandler(async (req, res) => {
  const { listDate } = req.params;
  const userId = req.user._id;

  let todos;

  switch (listDate) {
    case "today":
      todos = await Todo.find({
        status: "progress",
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    case "this week":
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate());
      todos = await Todo.find({
        status: "progress",
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(endOfMonth.getDate() - 1);
      todos = await Todo.find({
        status: "progress",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});

export const getuDoneTodos = asyncHandler(async (req, res) => {
  const { listDate } = req.params;
  const userId = req.user._id;

  let todos;

  switch (listDate) {
    case "today":
      todos = await Todo.find({
        status: "done",
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    case "this week":
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate());
      todos = await Todo.find({
        status: "done",
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(endOfMonth.getDate() - 1);
      todos = await Todo.find({
        status: "done",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});

export const getuBacklogTodos = asyncHandler(async (req, res) => {
  const { listDate } = req.params;
  const userId = req.user._id;

  let todos;

  switch (listDate) {
    case "today":
      todos = await Todo.find({
        status: "backlog",
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    case "this week":
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate());
      todos = await Todo.find({
        status: "backlog",
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(endOfMonth.getDate() - 1);
      todos = await Todo.find({
        status: "backlog",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ updatedAt: -1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});

export const updateTodo = asyncHandler(async (req, res) => {
  const data = req.body;
  await Todo.findByIdAndUpdate(data._id, data);
  res.status(200).json({ success: true });
});

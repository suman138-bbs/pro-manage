import Todo from "../models/todo.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import User from "../models/user.model.js";

export const createTodo = asyncHandler(async (req, res) => {
  const data = req.body;
  const userId = req.user._id;

  const { title } = data;
  const { todos } = await User.findById(userId).populate("todos.todoId");
  const duplicateTodo = todos.find((todo) => todo.todoId.title === title);

  if (duplicateTodo) {
    throw new CustomError("Todo name already exists", 400);
  }

  const newTodo = await Todo.create(data);

  await User.findByIdAndUpdate(userId, {
    $push: { todos: { todoId: newTodo._id } },
  });

  res.status(200).json({
    success: true,
    newTodo,
    message: "Todo list created successfully",
  });
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
      }).sort({ createdAt: 1 });
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
      }).sort({ createdAt: 1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(startOfMonth.getDate() - 30);
      const endOfMonth = new Date();
      todos = await Todo.find({
        status: "todo",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ createdAt: 1 });
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
      }).sort({ createdAt: 1 });
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
      }).sort({ createdAt: 1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(startOfMonth.getDate() - 30);
      const endOfMonth = new Date();
      todos = await Todo.find({
        status: "progress",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ createdAt: 1 });
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
      }).sort({ createdAt: 1 });
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
      }).sort({ createdAt: 1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(startOfMonth.getDate() - 30);
      const endOfMonth = new Date();
      todos = await Todo.find({
        status: "done",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ createdAt: 1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});

export const getBacklogTodos = asyncHandler(async (req, res) => {
  const { listDate } = req.params;
  console.log(listDate);
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
      }).sort({ createdAt: 1 });
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
      }).sort({ createdAt: 1 });
      break;
    case "this month":
      const startOfMonth = new Date();
      startOfMonth.setDate(startOfMonth.getDate() - 30);
      const endOfMonth = new Date();
      todos = await Todo.find({
        status: "backlog",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        _id: {
          $in: (await User.findById(userId)).todos.map((todo) => todo.todoId),
        },
      }).sort({ createdAt: 1 });
      break;
    default:
      throw new CustomError("Invalid listDate parameter", 400);
  }

  res.status(200).json({ status: true, todos });
});
/////

export const updateTodo = asyncHandler(async (req, res) => {
  const { data, type } = req.body;
  const id = data._id;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const todo = await Todo.findOne({
    title: data.title,
    _id: { $in: user.todos.map((todo) => todo.todoId) },
  });

  if (!todo) {
    await Todo.findByIdAndUpdate(id, data);
    res
      .status(200)
      .json({ success: true, message: "Todo Updated Successfully" });
    return;
  }

  const existingTodo = await Todo.findOne({
    _id: { $ne: id },
    title: data.title,
    _id: { $in: user.todos.map((todo) => todo.todoId) },
  });

  if (existingTodo?.id !== data._id) {
    throw new CustomError("Todo name already exists", 400);
  }
  await Todo.findByIdAndUpdate(id, data);
  res.status(200).json({ success: true, message: "Todo Updated Successfully" });
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const userId = req.user._id;

  await Todo.findByIdAndDelete(id);

  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  user.todos = user.todos.filter((todo) => {
    return todo && todo.todoId && todo.todoId.toString() !== id;
  });

  await user.save();

  res.status(200).json({ success: true, message: "Todo Deleted Successfully" });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, name } = req.body;

  const user = await User.findById(req.user._id);
  if (!(await await user.comparePassword(oldPassword))) {
    throw new CustomError("Old Password Not Matched");
  }
  user.password = newPassword;
  user.name = name;
  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Password Changed Successfully" });
});

export const getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    res
      .status(200)
      .json({ success: false, message: "Todo is either Deleted or Not Found" });
    return;
  }
  res.status(200).json({ success: true, todo });
});

export const getAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { todos } = await User.findById(userId).populate("todos.todoId");
  const tod = todos.map((t) => {
    return t.todoId;
  });
  if (!todos) {
    throw new CustomError("User not found", 404);
  }

  let backlogTasks = 0;
  let todoTasks = 0;
  let inProgressTasks = 0;
  let completedTasks = 0;
  let lowPriorityTasks = 0;
  let moderatePriorityTasks = 0;
  let highPriorityTasks = 0;
  let dueDateTasks = 0;

  tod.forEach((todo) => {
    if (todo?.status === "backlog") {
      backlogTasks++;
    } else if (todo?.status === "todo") {
      todoTasks++;
    } else if (todo?.status === "progress") {
      inProgressTasks++;
    } else if (todo?.status === "done") {
      completedTasks++;
    }

    if (todo?.priority === "low") {
      lowPriorityTasks++;
    } else if (todo?.priority === "moderate") {
      moderatePriorityTasks++;
    } else if (todo?.priority === "high") {
      highPriorityTasks++;
    }

    if (
      todo?.dueDate &&
      todo?.status !== "done" &&
      new Date(todo.dueDate) > new Date()
    ) {
      dueDateTasks++;
    }
  });

  const analyticsData = {
    backlogTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
    lowPriorityTasks,
    moderatePriorityTasks,
    highPriorityTasks,
    dueDateTasks,
  };

  res.status(200).json({ success: true, analytics: analyticsData });
});

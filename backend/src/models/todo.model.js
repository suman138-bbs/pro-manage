import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["high", "moderate", "low"],
    },
    checklist: [
      {
        name: {
          type: String,
          required: true,
        },
        isMarked: {
          type: Boolean,
          default: false,
        },
      },
    ],
    status: {
      type: String,
      enum: ["backlog", "todo", "progress", "done"],
      default: "todo",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;

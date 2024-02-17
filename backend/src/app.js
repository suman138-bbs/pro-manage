import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://quizzie123.netlify.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", userRouter);
app.use("/app", todoRouter);
app.all("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

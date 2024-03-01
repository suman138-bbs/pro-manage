import axios from "axios";

export default axios.create({
  baseURL: "https://kanban-backend-df3h.onrender.com",
  withCredentials: true,
});

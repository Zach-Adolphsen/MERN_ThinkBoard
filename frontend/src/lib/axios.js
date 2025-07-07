import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4800/api",
});

export default api;

// настройки сервера axios
import axios from "axios";
import Cookie from "js-cookie";
import { getLoginPath } from "../routes";

const baseURL = process.env.REACT_APP_HOST || "http://localhost:8000/api";

const server = axios.create({
  baseURL,
});

server.interceptors.request.use((request) => {
  const token = Cookie.get("key");
  if (token) {
    request.headers.Authorization = token;
  }
  return request;
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      document.location.href = getLoginPath();
    }
    return Promise.reject(error);
  }
);

export default server;
export { baseURL };

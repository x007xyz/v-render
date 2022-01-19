import axios from "axios";

const request = axios.create({
  timeout: 3000,
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchCategory = () => {
  return request.get("/api/category");
};

import axios from "axios";

declare var process : {
  env: {
    BACKEND: string
  }
}

const apiClient = axios.create({
  baseURL: process.env.BACKEND,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;

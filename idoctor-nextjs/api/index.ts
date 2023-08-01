import {errorHandler} from "@/hooks/errorHandler";
import axios, {AxiosRequestConfig} from "axios";

const CLIENT_API =
  process.env.NODE_ENV === "production"
    ? "https://api.example.com/"
    : `http://localhost:5000`;

export const api = axios.create({
  baseURL: `${CLIENT_API}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const resetAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    api.defaults.headers.common.Authorization = "undefined";
  }
};

const getCurrentSession = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      resetAuthToken();

      return;
    }

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/user/by-token", config);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    if (
      error.response?.status === 403 &&
      error.response.data.includes("Token expired") &&
      !request._retry
    ) {
      request.retry = true;
      const session = await getCurrentSession();
      resetAuthToken(session.token);
      request.headers.Authorization = api.defaults.headers.common.Authorization;

      return api(request);
    }

    return Promise.reject(error);
  }
);

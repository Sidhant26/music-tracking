import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const test = async () => {
  try {
    const response = await api.get("/hello");
    return response.data;
  } catch (error) {
    return error.response?.data || "An error occurred.";
  }
};

export const register = async (username, password) => {
  try {
    const response = await api.post("/register", { username, password });
    if (response.data.status === "ok") {
      localStorage.setItem("token", response.data.user);
      localStorage.setItem("username", username);
      return { success: true, message: response.data.message };
    }
    return { success: false, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred during registration.",
    };
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    if (response.data.status === "ok") {
      localStorage.setItem("token", response.data.user);
      localStorage.setItem("username", username);
      return { success: true };
    }
    return { success: false, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "An error occurred during login.",
    };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.assign("/login");
};

export const getAuthToken = () => localStorage.getItem("token");

export const isAuthenticated = () => !!getAuthToken(); //!! converts to boolean

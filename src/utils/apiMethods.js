import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
export const baseURL = process.env.REACT_APP_NODE_SERVER_HOST;
const Client = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// POST action
const post = async (url, data, dispatch) => {
  try {
    let response;

    response = await Client.post(url, data, {});

    return response.data;
  } catch (error) {
    console.log({ error });
  }
};

// POST action for multipart/formData
const postMultipart = async (url, data, dispatch) => {
  try {
    let response;

    response = await Client.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// GET action
const get = async (url) => {
  try {
    let response;
    response = await Client.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//update
const update = async (url, data, dispatch) => {
  try {
    let response;

    response = await Client.put(url, data);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//update for formData/multipart
const updateMultipart = async (url, data) => {
  try {
    let response;

    response = await Client.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// DELETE action
const remove = async (url) => {
  try {
    let response;
    response = await Client.delete(url, {});

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const login = async (data) => {
  const userData = await post("/api/auth/signin", data);
  console.log({ userData });
  if (!userData) {
    toast.error("Wrong credentials", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }

  toast.success("You logged in successfully", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const { username, id, roles, email } = userData;
  localStorage.setItem("token", userData.accessToken);
  localStorage.setItem("user", JSON.stringify({ username, id, roles, email }));

  return userData;
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expiresIn");
};

export {
  login,
  get,
  postMultipart,
  post,
  remove,
  update,
  updateMultipart,
  logout,
};

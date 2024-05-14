import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import { login as loginAxios } from "../utils/apiMethods";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    console.log({ data });
    const res = await loginAxios(data);
    if (!res) return;
    setUser(res);
    setToken(res.accessToken);
    // refresh the page
    window.location.replace("/profile");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

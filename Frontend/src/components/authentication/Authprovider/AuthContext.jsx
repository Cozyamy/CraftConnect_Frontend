import { createContext, useContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../../firebase/Firebaseconfig"; // Adjust the path as needed
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import axios from "axios";
import { getUserFromServer, loginWithServer, getCategories } from "../Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [serverUser, setServerUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));
  const [loading, setLoad] = useState(true);

  const [userMode, setUserMode] = useState(Cookies.get("userMode") ?? "user");

  const changeMode = (mode) => {
    if (mode == "artisan" && !serverUser.artisan) return false;
    setUserMode(mode);
    Cookies.set("userMode", mode);
    return true;
  };

  useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await getCategories();
          console.log({ cateData:data });
        } catch (error) {
          console.log({ cateError:error });
        } finally {
        }
      
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await getUserFromServer(token);
          setServerUser(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        try {
          const res = await loginWithServer(token);
          Cookies.set("token", res.data.access_token);
          setToken(res.data.access_token);
        } catch (error) {
          console.log(error);
        }
        setLoad(false);
      } else {
        setUser(null);
        setLoad(false);
      }
    });
  }, [token]);

  const logOut = async () => {
    Cookies.remove("token");
    Cookies.remove("userMode");
    setToken(null);
    setUserMode("user");
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logOut,
        userMode,
        changeMode,
        setUser,
        loading,
        serverUser,
        token,
        setServerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

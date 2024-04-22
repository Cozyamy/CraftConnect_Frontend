import { createContext, useContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../../firebase/Firebaseconfig"; // Adjust the path as needed
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import axios from "axios";
import { getUserFromServer, loginWithServer } from "../Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [serverUser, setServerUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));
  const [loading, setLoad] = useState(true);

  const [userMode, setUserMode] = useState(Cookies.get("userMode"));

  const changeMode = (mode) => {
    if (mode == "artisan" && !serverUser.artisan) return false;
    setUserMode(mode);
    Cookies.set("userMode", mode);
    return true;
  };


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

  },[token])


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        try {
          const res = await loginWithServer(token);
          setToken(res.data.access_token);
          Cookies.set("token", res.data.access_token);
        } catch (error) {
          console.log(error);
        }
        setLoad(false);
      } else {
        setUser(null);
        setLoad(false);
      }
    });
    // async function newFunction() {
    // if (token) {
    //   try {
    //     const res = await axios.get(
    //       "https://4199-197-210-226-200.ngrok-free.app/api/v1/user/name",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     setUser(res.data);
    //     console.log("User is", res.data);
    //   } catch (error) {
    //     console.log("Error", error);
    //   }
    //   return;
    // }

    // setLoad(false);
    // }
    // newFunction();
  }, [token]);

  const logOut = async () => {
    Cookies.remove("token");
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, logOut, userMode, changeMode, setUser, loading,serverUser,token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

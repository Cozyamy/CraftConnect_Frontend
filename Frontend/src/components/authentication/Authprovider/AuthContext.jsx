import { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification
} from "../../firebase/Firebaseconfig"; // Adjust the path as needed
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
// import axios from "axios";
import {
  getUserFromServer,
  loginWithServer,
  getCategories,
  registerInServer,
} from "../Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [serverUser, setServerUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));
  const [loading, setLoad] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [userMode, setUserMode] = useState(Cookies.get("userMode") ?? "user");

  // console.log({serverUser})

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
        console.log({ cateData: data });
      } catch (error) {
        console.log({ cateError: error });
      } finally {
        ("");
      }

      fetchData();
    };
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

        if (!user.displayName) {
          
          const first_name = Cookies.get('first_name')
          const last_name = Cookies.get('last_name')
          const phone_number = Cookies.get('phone_number')
     
      
          try {
            await registerInServer(
              token,
              first_name,
              last_name,
              phone_number
            );
            
          } catch (error) { }
          try {
            await updateProfile(user, {
              displayName: first_name + " " + last_name,
            });
          } catch (error) {}
          if (!user.emailVerified) {
            await sendEmailVerification(user);
            return await signOut(auth)
          };
          setLoad(false);
        }
        if (!user.emailVerified) return await signOut(auth);
        // console.log({ fbToken: token });
        setLoad(false);
        try {
          const res = await loginWithServer(token);
          Cookies.set("token", res.data.access_token);
          // console.log({ accessToken: res.data.access_token });
          setToken(res.data.access_token);
        } catch (error) {
          console.log(error);
        }
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
        formData, setFormData,
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

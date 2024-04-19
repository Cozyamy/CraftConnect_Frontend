import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/Firebaseconfig"; // Adjust the path as needed
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));

  const [userMode, setUserMode] = useState(Cookies.get("userMode"));

  const changeMode = (mode) => {
    if (mode == "artisan" && !user.artisan) return;
    setUserMode(mode);
    Cookies.set("userMode", mode);
  };

  useEffect(() => {
    async function newFunction() {
      if (token) {
        const res = await axios.get(
          "https://4199-197-210-226-200.ngrok-free.app/api/v1/user/name",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
        console.log("User is", res.data);
      }
    }
    newFunction();
  }, [token]);

  const logout = () => {
    // Clear the user ID token from the cookie on logout
    Cookies.remove("firebaseToken_UserIdToken"); // Modify the cookie name with prefix
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout, userMode, changeMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

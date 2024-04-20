import { createContext, useContext, useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../../firebase/Firebaseconfig"; // Adjust the path as needed
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));
  const [loading, setLoad] = useState(true);

  const [userMode, setUserMode] = useState(Cookies.get("userMode"));

  const changeMode = (mode) => {
    // if (mode == "artisan" && !user.artisan) return;
    setUserMode(mode);
    Cookies.set("userMode", mode);
  };

  useEffect(() => {
    async function newFunction() {
      if (token) {
        try {
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
        } catch (error) {
          console.log("Error", error);
        }
      } else {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
          }
          setLoad(false);
        });
      }
      setLoad(false);
    }
    newFunction();
  }, [token]);

  const logout = () => {
    // Clear the user ID token from the cookie on logout
    Cookies.remove("firebaseToken_UserIdToken"); // Modify the cookie name with prefix
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, logout, userMode, changeMode, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

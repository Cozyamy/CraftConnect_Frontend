import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/Firebaseconfig'; // Adjust the path as needed
import { signOut } from 'firebase/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userIdToken = Cookies.get('firebaseToken_UserIdToken'); // Modify the cookie name with prefix
    if (userIdToken) {
      setUser({ uid: userIdToken });
    } else {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        setUser(authUser);
      });
      return unsubscribe;
    }
  }, []);

  const logout = () => {
    // Clear the user ID token from the cookie on logout
    Cookies.remove('firebaseToken_UserIdToken'); // Modify the cookie name with prefix
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

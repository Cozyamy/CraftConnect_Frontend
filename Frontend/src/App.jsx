import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import { Landing } from "./routes";
import SignUp from "./components/authentication/Signup/Signup";
import Login from "./components/authentication/Login/Login";
import Morecategory from "./components/CategoryData/Morecategory";
import { AuthProvider, useAuth } from "./components/authentication/Authprovider/AuthContext"; // Import useAuth
import DashboardLayout from "./components/Dashboard/Dashboard";
import Spinner from "./components/authentication/Spinner/Spinner";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../src/components/firebase/Firebaseconfig";

// Protected Route Component
const ProtectedRoute = ({ element, path }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('login');
    }
  }, [user, navigate]);

  return <>{element}</>;
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "/category",
      element: <ProtectedRoute element={<Morecategory />} />, // Wrap protected component with ProtectedRoute
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<DashboardLayout />} />, // Wrap protected component with ProtectedRoute
    },
  ]);

  return (
    <AuthProvider>
      {loading ? (
        <Spinner/>
      ) : (
        <section className="containers">
          <RouterProvider router={router} />
        </section>
      )}
    </AuthProvider>
  );
}

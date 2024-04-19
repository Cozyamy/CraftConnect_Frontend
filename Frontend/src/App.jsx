import { useState, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { Landing } from "./routes";
import SignUp from "./components/authentication/Signup/Signup";
import Login from "./components/authentication/Login/Login";
import Morecategory from "./components/CategoryData/Morecategory";
import {
  AuthProvider,
  useAuth,
} from "./components/authentication/Authprovider/AuthContext"; // Import useAuth
import DashboardLayout from "./components/Dashboard/Dashboard";
import Spinner from "./components/authentication/Spinner/Spinner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/components/firebase/Firebaseconfig";
import DashPage1 from "./components/Dashboard/DashProperties/DashPage1";
import DashPage3 from "./components/Dashboard/DashProperties/DashPage3";
import DashPage5 from "./components/Dashboard/DashProperties/DashPage5";
import DashPage6 from "./components/Dashboard/DashProperties/DashPage6";

// Protected Route Component
const ProtectedRoute = ({ element, path }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("login");
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
      element: (
        <ProtectedRoute
          element={
            <DashboardLayout>
              <DashPage1 />
            </DashboardLayout>
          }
        />
      ), //
    },
    {
      path: "/dashboard/orders",
      element: (
        <ProtectedRoute
          element={
            <DashboardLayout>
              <DashPage3 />
            </DashboardLayout>
          }
        />
      ), //
    },
    {
      path: "/dashboard/pricing",
      element: (
        <ProtectedRoute
          element={
            <DashboardLayout>
              <DashPage5/>
            </DashboardLayout>
          }
        />
      ), //
    },
    {
      path: "/dashboard/reviews",
      element: (
        <ProtectedRoute
          element={
            <DashboardLayout>
              <DashPage6 />
            </DashboardLayout>
          }
        />
      ), //
    },
  ]);

  return (
    <AuthProvider>
      {loading ? (
        <Spinner />
      ) : (
        <section className="containers">
          <RouterProvider router={router} />
        </section>
      )}
    </AuthProvider>
  );
}

import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Landing } from "./routes";
import SignUp from "./components/authentication/Signup/Signup";
import Login from "./components/authentication/Login/Login";
import Morecategory from "./components/CategoryData/Morecategory";
import { AuthProvider } from "./components/authentication/Authprovider/AuthContext";
import DashboardLayout from "./components/Dashboard/Dashboard";
import Spinner from "./components/authentication/Spinner/Spinner";
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "../src/components/firebase/Firebaseconfig"


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication state here
    // For example, using Firebase onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Set loading to false once authentication state is determined
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
      element: <Morecategory />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
    },
  ]);

  return (
    <AuthProvider>
      {loading ? (
        // Render spinner or loading animation here
        <Spinner/>
      ) : (
        // Render the RouterProvider with your routes once the authentication state is determined
        <section className="containers">
          <RouterProvider router={router} />
        </section>
      )}
    </AuthProvider>
  );
}

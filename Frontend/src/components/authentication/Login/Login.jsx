import { useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  // GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"; // Corrected import
import { auth, googleProvider } from "../../firebase/Firebaseconfig"; // Corrected import
import { useAuth } from "../Authprovider/AuthContext";
import PasswordResetModal from "../PassReset/PasswdReset";
import axios from "axios"; // Import axios

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
    loginError: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [passwdResetModal, setPasswdResetModal] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswdReset = () => {
    setPasswdResetModal(!passwdResetModal);
  };

  const handleLogInClick = () => {
    navigate("/signup");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const endPoint = "https://53cc-105-113-33-231.ngrok-free.app/api/v1/login";
  
    if (!email || !password) {
      setFormErrors({
        email: !email,
        password: !password,
        loginError: false,
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        setFormErrors({
          email: false,
          password: false,
          loginError: true,
        });
        setErrorMessage("Please verify your email address before logging in."); // Update errorMessage
        setIsLoading(false);
        return;
      }
  
      setLoginSuccess(true); // Set login success message to true
      navigate("/dashboard"); // Redirect after successful login
  
      // Wait for user to be available
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // Get ID token
          const token = await user.getIdToken();
          console.log(token);
          // Send token to server
          const res = await axios.post(endPoint, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data); // Handle response
        }
      });
    } catch (error) {
      console.error("Error signing in:", error.message);
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        // Incorrect email or password
        setFormErrors({
          email: false,
          password: false,
          loginError: true,
        });
        setErrorMessage("Incorrect email or password."); // Update errorMessage
      } else {
        // Other errors
        setFormErrors({
          email: false,
          password: false,
          loginError: true,
        });
        setErrorMessage("An error occurred while logging in. Please try again later."); // Update errorMessage
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true); // Start Google sign-in loading spinner

    try {
      // Sign in with Google using Firebase
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      // Handle error as needed
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const isReadyForSubmission = () => {
    return true; // For now, always return true
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-white">
      <div className="w-full sm:max-w-[42rem]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-2 text-black">
            Welcome Back
          </h1>
          <p className="text-gray-600 mb-4">
            Please enter your login details below
          </p>
        </div>
        <form
          className="border border-2 p-8 rounded-lg w-full"
          onSubmit={handleSubmit}
        >
          {loginSuccess && ( // Render success message if loginSuccess is true
            <p className="text-green-500 mb-4">Login successful</p>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-[400] mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className={`border-gray-300 border w-full px-3 py-2 rounded-lg focus:outline-none ${
                formErrors.email || formErrors.loginError
                  ? "border-red-500"
                  : "focus:border-blue-500"
              }`}
            />
            {formErrors.email && (
              <small className="text-red-500">Invalid email address</small>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-600 font-[400] mb-2"
            >
              Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className={`border-gray-300 border w-full px-3 py-2 rounded-lg pr-10 focus:outline-none ${
                  formErrors.password || formErrors.loginError
                    ? "border-red-500"
                    : "focus:border-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <CiUnlock className="h-6 w-6 text-gray-400 cursor-pointer" />
                ) : (
                  <CiLock className="h-6 w-6 text-gray-400 cursor-pointer" />
                )}
              </button>
            </div>
            {formErrors.password && (
              <small className="text-red-500">Wrong password</small>
            )}
          </div>

          {/* Password */}
          {passwdResetModal && (
            <PasswordResetModal onClose={handlePasswdReset} />
          )}

          <div className="mb-4 text-right">
            <button
              type="button"
              className="text-[#0F6C96] text-sm font-[400] hover:underline focus:outline-none"
              onClick={handlePasswdReset}
            >
              Forgot password?
            </button>
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className={`flex items-center justify-center bg-[#0f6c96] text-white font-[400] py-2 mt-4 px-4 rounded-lg w-full border-solid border-[1px] hover:bg-white hover:border-[#0F6C96] hover:text-[#0F6C96] ${
              !isReadyForSubmission() || isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!isReadyForSubmission() || isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 0112 4V0C6.486 0 2 4.486 2 10h4c0-3.309 2.676-6 6-6v4c-2.206 0-4.149.929-5.572 2.414L6 13.291zM20 12h-4c0-5.514-4.486-10-10-10v4c3.309 0 6 2.691 6 6h4c0-3.309 2.691-6 6-6v4c-5.514 0-10 4.486-10 10h4c0-2.206 1.794-4 4-4v-4c0-4.411-3.589-8-8-8v4c2.206 0 4 1.794 4 4z"
                ></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Google Sign In Button */}
          <button
            className={`flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg w-full mt-4 ${
              isGoogleLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 0112 4V0C6.486 0 2 4.486 2 10h4c0-3.309 2.676-6 6-6v4c-2.206 0-4.149.929-5.572 2.414L6 13.291zM20 12h-4c0-5.514-4.486-10-10-10v4c3.309 0 6 2.691 6 6h4c0-3.309 2.691-6 6-6v4c-5.514 0-10 4.486-10 10h4c0-2.206 1.794-4 4-4v-4c0-4.411-3.589-8-8-8v4c2.206 0 4 1.794 4 4z"
                ></path>
              </svg>
            ) : (
              <>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Logo"
                  className="h-6 w-6 mr-2"
                />
                Sign in with Google
              </>
            )}
          </button>

          {formErrors.loginError && (
            <small className="text-red-500">Incorrect email or password</small>
          )}
          <div className="flex justify-center items-center mb-4">
            <p className="text-gray-700 mr-2">Don't have an Account?</p>
            <button
              type="button"
              className="text-[#0F6C96] font-[400] py-2 px-0 rounded-lg"
              style={{ borderColor: "#0F6C96" }}
              onClick={handleLogInClick}
            >
              Sign up
            </button>
          </div>
          <button
            className="border border-transparent hover:border-blue-500 text-[#0F6C96] font-[400] py-2 px-4 rounded-lg hover:bg-[#0F6C96] hover:text-white"
            style={{ borderColor: "#0F6C96" }}
            onClick={handleHomeClick}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

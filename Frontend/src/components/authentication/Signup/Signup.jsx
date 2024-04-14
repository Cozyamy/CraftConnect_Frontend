import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLock, CiUnlock } from "react-icons/ci";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
} from "../../firebase/Firebaseconfig.js";
import { useAuth } from "../Authprovider/AuthContext";
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullname: false,
    email: false,
    phone: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate input on change
    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setFormErrors({ ...formErrors, email: !isValidEmail });
    } else if (name === "password") {
      setFormErrors({ ...formErrors, password: value.length < 6 });
    } else {
      setFormErrors({ ...formErrors, [name]: value.trim() === "" });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields before submission
    const isFormValid = Object.values(formErrors).every((error) => !error);
    if (!isFormValid) {
      console.log("Please fill out all required fields correctly.");
      return;
    }
  
    setIsLoading(true); // Enable loading state during submission
    setErrorMessage(""); // Clear any previous error messages
  
    try {
      const { email, password } = formData;
      // Create user
      await createUserWithEmailAndPassword(auth, email, password);
  
      // Wait for user to be available
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // Get ID token
          const token = await user.getIdToken();
          console.log(token);
          // Send token to server
          const res = await axios.post('http://127.0.0.1:8000/api/v1/register', { token });
          console.log(res.data);
          navigate("/category"); // Redirect after successful signup
        }
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email is already in use. Please use a different email.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        console.log("Error signing up:", error.message);
      }
    } finally {
      setIsLoading(false); // Disable loading state after submission
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isReadyForSubmission = () => {
    return (
      formData.fullname.trim() !== "" &&
      validateEmail(formData.email) &&
      formData.phone.trim() !== "" &&
      formData.password.length >= 6 &&
      Object.values(formErrors).every((error) => !error)
    );
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true); // Enable loading state during Google sign-in

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/category");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Email is already in use. Please use a different email.");
      } else {
        console.log("Error signing up with Google:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-white">
      <div className="w-screen sm:max-w-[42rem]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-2 text-black">
            Create Your Account
          </h1>
          <p className="text-gray-600 mb-4">
            Please enter your details to create your account
          </p>
        </div>
        <form
          className="border border-2 p-8 rounded-lg w-full"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-gray-600 font-[400] mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              className={`border w-full px-3 py-2 rounded-lg focus:outline-none ${
                formErrors.fullname
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
              value={formData.fullname}
              onChange={handleInputChange}
            />
          </div>

          {/* Email Address */}
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
              className={`border w-full px-3 py-2 rounded-lg focus:outline-none ${
                formErrors.email
                  ? "border-red-500"
                  : validateEmail(formData.email)
                  ? "border-green-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <small className="text-red-500">
                Please enter a valid email address
              </small>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-600 font-[400] mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className={`border w-full px-3 py-2 rounded-lg focus:outline-none ${
                formErrors.phone
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-[400] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className={`border w-full px-3 py-2 rounded-lg pr-10 focus:outline-none ${
                  formErrors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <CiUnlock
                    className="h-6 w-6 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <CiLock
                    className="h-6 w-6 text-gray-400 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </span>
            </div>
            {formErrors.password && (
              <small className="text-red-500">
                Password must be at least 6 characters
              </small>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-[#0f6c96] flex items-center justify-center text-white font-[400] py-2 mt-4 px-4 rounded-lg w-full border-solid border-[1px] hover:bg-white hover:border-[#0F6C96] hover:text-[#0F6C96] ${
              !isReadyForSubmission() || isLoading
                ? "opacity-70 cursor-not-allowed"
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
              "Next"
            )}
          </button>

          {/* Google Sign-Up Button */}
          <button
            className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg w-full mt-4"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
              className="h-6 w-6 mr-2"
            />
            Sign in with Google
          </button>

          {errorMessage && (
            <small className="text-red-500 mt-2">{errorMessage}</small>
          )}

          {/* Already have an account? Sign In Link */}
          <div className="flex justify-center items-center mt-4">
            <p className="text-gray-700 mr-2">Already have an account?</p>
            <button
              type="button"
              className="text-[#0F6C96] font-[400] py-2 px-0 rounded-lg"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>

          {/* Back to Home button */}
          <button
            className="border border-transparent hover:border-blue-500 text-[#0F6C96] font-[400] py-2 px-4 rounded-lg hover:bg-[#0F6C96] hover:text-white"
            style={{ borderColor: "#0F6C96" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

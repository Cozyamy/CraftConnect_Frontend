import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/Firebaseconfig";

const PasswordResetModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({ email: false });
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false); // State to track if reset email has been sent

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setFormErrors({ email: true });
      return;
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, 'theodoreimonigie@gmail.com');
      setResetEmailSent(true); // Set the state to true after sending the reset email
      // onClose(); // Close the modal after sending password reset email
    } catch (error) {
      console.error("Error sending password reset email:", error);
      // Handle error state or display error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormErrors({ email: false });
  };

  const isReadyForSubmission = () => {
    return email.trim() !== "" && !isLoading;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
        <span className="absolute top-0 right-3 hover:text-red-600 cursor-pointer text-[2rem]" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`border ${formErrors.email ? "border-red-500" : "border-gray-300"} px-3 py-2 rounded-lg focus:outline-none w-full`}
            />
            {formErrors.email && <small className="text-red-500">Email is required</small>}
          </div>
          {resetEmailSent && (
            <div className="text-green-500 mb-4">Password reset email sent successfully!</div>
          )}
          <button
            type="submit"
            className={`flex items-center justify-center bg-[#0f6c96] text-white font-[400] py-2 mt-4 px-4 rounded-lg w-full border-solid border-[1px] hover:bg-white hover:border-[#0F6C96] hover:text-[#0F6C96] ${
              !isReadyForSubmission() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isReadyForSubmission()}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
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
            )}
            {isLoading ? "Sending Email..." : "Send Reset Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetModal;

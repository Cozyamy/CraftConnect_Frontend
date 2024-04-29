import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/Firebaseconfig";
import PropTypes from "prop-types";

const PasswordResetModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess(true);
    } catch (error) {
      setResetError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsButtonDisabled(e.target.value === "");
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start justify-end">
              <div className="cursor-pointer w-12 rounded-full bg-red-100 sm:h-10 sm:w-10 flex items-center justify-center" onClick={onClose}>
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-4">
              Reset Password
            </h3>
            {resetSuccess ? (
              <p className="text-sm text-gray-500">Password reset email sent successfully check your inbox or span.</p>
            ) : (
              <>
                <p className="text-sm text-gray-500">Enter your email address to reset your password.</p>
                <input
                  type="email"
                  className="mt-3 border border-gray-300 rounded-md w-full px-3 py-2 outline-none"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                />
                {resetError && <p className="text-red-500 text-sm mt-2">{resetError}</p>}
                <div className="mt-4">
                  <button
                    type="button"
                    className={`inline-flex justify-center w-full px-4 py-2 mb-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0f6c96] ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:border-[#0F6C96] hover:text-[#0F6C96]'}`}
                    disabled={isButtonDisabled || isLoading}
                    onClick={handleResetPassword}
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
                      "Reset Password"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
PasswordResetModal.propTypes = {
  onClose: PropTypes.func.isRequired
};
export default PasswordResetModal;

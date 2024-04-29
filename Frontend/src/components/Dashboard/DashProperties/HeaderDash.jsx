import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { HiBars4 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { AuthContext } from "../../authentication/Authprovider/AuthContext";
import UploadPicture from "./Uploadpic";
import { apiKey, getUserFromServer } from "../../authentication/Api";

const Header = ({ toggleAside, asideVisible }) => {
  const { user, changeMode, userMode, token, setServerUser, serverUser } =
    useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const [picture, setPicture] = useState();
  const [address, setAddress] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPicture(file);
      setPictureUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    // Construct FormData object
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("address", address);

    console.log("Request:", {
      picture,
      address,
      token,
    });

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        `${apiKey}submit_artisan_info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("Response:", response.data);

      // Switch the mode to "artisan" immediately after successful submission
      changeMode("artisan");

      // Update serverUser state if necessary
      if (!serverUser.artisan) {
        const userData = await getUserFromServer(token);
        setServerUser(userData.data);
      }

      // Close the form submission modal and show the success modal
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const switcher = () => {
    // Show the modal before switching
    if (userMode == "user" && !serverUser.artisan) return setShowModal(true);
    changeMode(userMode === "user" ? "artisan" : "user");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPicture("");
    setAddress("");
    setIsButtonDisabled(true);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setIsButtonDisabled(event.target.value === "" || picture === "");
  };

  return (
    <header className="p-12 flex items-center justify-between bg-[#e2edf2] border-b-4 sm-max:p-6">
      <h1 className="lg:block text-2xl sm-max:hidden">
        Welcome {user && user.displayName ? user.displayName : "Guest"}
      </h1>
      <h1 className="lg:hidden md:hidden text-[12px]">
        Welcome{" "}
        {user && user.displayName ? user.displayName.split(" ")[0] : "Guest"}
      </h1>

      <div className="flex items-center justify-center gap-4">
        <button
          className="px-2 py-2 bg-[#0f6c96] rounded-md text-white border-2 hover:border-[#0F6C96] hover:text-[#0F6C96] hover:bg-transparent sm-max:text-[10px]"
          onClick={switcher}
        >
          {userMode === "user" ? "Switch to Artisan" : "Switch to User "}
        </button>

        <UploadPicture onFileChange={handleFileChange}/>

        <button
          className="text-3xl lg:hidden md-max:block sm-max:block"
          onClick={toggleAside}
        >
          {asideVisible ? <LiaTimesSolid /> : <HiBars4 />}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start justify-end">
                  <div
                    className="cursor-pointer w-12 rounded-full bg-red-100 sm:h-10 sm:w-10 flex items-center justify-center"
                    onClick={handleCloseModal}
                  >
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-lg leading-6 font-medium text-gray-900 text-center mb-4">
                  Become an Artisan
                </h2>

                {/* Profile Picture Upload */}
                <div className="flex items-center justify-center w-full mb-4">
                  <label
                    htmlFor="profile-picture"
                    className="w-32 h-32 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    {pictureUrl ? (
                      <img
                        src={pictureUrl}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                    <input
                      type="file"
                      id="profile-picture"
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                  </label>
                </div>
                {/* Address textarea */}
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="border border-gray-300 rounded-md p-2 w-full resize-none"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Enter your address"
                  ></textarea>
                </div>
                {/* Submit Button */}
                <button
                  className={`inline-block w-full px-4 py-2 bg-[#0f6c96] text-white rounded-md hover:bg-[#0F6C96] hover:text-white ${
                    isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleSubmit}
                  disabled={isButtonDisabled}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Artisan Role Switch Success Modal */}
      {showSuccessModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start justify-end">
                  <div
                    className="cursor-pointer w-12 rounded-full bg-red-100 sm:h-10 sm:w-10 flex items-center justify-center"
                    onClick={() => setShowSuccessModal(false)}
                  >
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-lg leading-6 font-medium text-gray-900 text-center mb-4">
                  Artisan KYC updated successfully
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  toggleAside: PropTypes.func.isRequired,
  asideVisible: PropTypes.bool.isRequired,
};

export default Header;

import React, { useContext, useState } from "react";
import UploadPicture from "./Uploadpic";
import { AuthContext } from "../../authentication/Authprovider/AuthContext";


const Profile = () => {

  const [profilePicture, setProfilePicture] = useState("");
  const {serverUser} = useContext(AuthContext);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePicture(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  // State to manage form fields
  const [formData, setFormData] = useState({
    first_name: serverUser.first_name?? "",
    last_name: serverUser.last_name?? "",
    phone_number: serverUser.phone_number?? "",
    email: serverUser.email?? "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic, e.g., update user profile
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      first_name: "",
      last_name: "",
      phone_number: "",
    });
    // Close modal after submission
    setShowModal(false);
  };

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Button to open the modal */}
      <div className="relative bg-white w-[10rem] h-16 rounded-md flex  items-center justify-center">
      <button onClick={openModal} className="text-[#0f6c96] hover:underline">
        Update Profile
      </button>    
      </div>

      {showModal &&  (
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
                  <div className="cursor-pointer w-12 rounded-full bg-red-100 sm:h-10 sm:w-10 flex items-center justify-center" onClick={closeModal}>
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-4">
                  Update Profile
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  {/* Profile Picture */}
                  <div className="form-group mb-4">
                    <h2>Picture</h2>
                   <UploadPicture onFileChange={handleFileChange}  />
                  </div>
                  {/* First Name */}
                  <div className="form-group">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="mt-3 border border-gray-300 rounded-md w-full px-3 py-2 outline-none"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="form-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="mt-3 border border-gray-300 rounded-md w-full px-3 py-2 outline-none"
                    />
                  </div>
                  {/* Phone Number */}
                  <div className="form-group">
                    <label htmlFor="phone-number">Phone Number</label>
                    <input
                      type="tel"
                      id="phone-number"
                      name="phone_number"
                      placeholder="+2347011234567"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="mt-3 border border-gray-300 rounded-md w-full px-3 py-2 outline-none"
                    />
                  </div>
                  {/* Email (read-only) */}
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email"  value={formData.email} readOnly className="mt-3 border border-gray-300 rounded-md w-full px-3 py-2 outline-none" />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="mt-4 inline-flex justify-center w-full px-4 py-2 mb-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0f6c96] hover:bg-white hover:border-[#0F6C96] hover:text-[#0F6C96]">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

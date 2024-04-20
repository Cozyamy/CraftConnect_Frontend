import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import { HiBars4 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { AuthContext } from "../../authentication/Authprovider/AuthContext";

const Header = ({ toggleAside, asideVisible }) => {
  const { changeMode, userMode } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const handleProfilePictureClick = () => {
    // Trigger the file selection dialog when the profile picture is clicked
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Perform file upload logic here, e.g., using FormData and fetch
      const formData = new FormData();
      formData.append("profilePicture", file);
      // Send formData to your backend for processing

      // Update the src attribute of the img element with the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("profile-picture").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="p-12 flex items-center justify-between bg-[#e2edf2] border-b-4">
      <h1 className="text-xl font-bold">Augstine Welcome </h1>

      <div className="flex items-center justify-center gap-4">
        <button
          className="px-2 py-3 bg-[#0f6c96] rounded-md text-white border-2 hover:border-[#0F6C96] hover:text-[#0F6C96] hover:bg-transparent"
          onClick={() => changeMode(userMode === "user" ? "artisan" : "user")}
        >
          {userMode === "user" ? "Switch to Artisan" : "Switch to User "}
        </button>

        <div
          className="w-12 h-12 rounded-full cursor-pointer border-1"
          onClick={handleProfilePictureClick}
        >
          <img
            id="profile-picture"
            src=""
            alt="user-profile"
            className="w-full h-full rounded-full"
          />
          
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            accept="image/*"
          />
        </div>

        <button
          className="text-3xl lg:hidden md:hidden sm-max:block"
          onClick={toggleAside}
        >
          {asideVisible ? <LiaTimesSolid /> : <HiBars4 />}
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleAside: PropTypes.func.isRequired,
  asideVisible: PropTypes.bool.isRequired,
};

export default Header;

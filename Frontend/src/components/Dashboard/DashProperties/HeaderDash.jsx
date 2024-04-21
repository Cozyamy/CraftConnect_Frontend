import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { HiBars4 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { AuthContext } from "../../authentication/Authprovider/AuthContext";
import UploadPicture from "./Uploadpic";

const Header = ({ toggleAside, asideVisible }) => {
  const { changeMode, userMode } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("");

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePicture(e.target.result);
    };
    reader.readAsDataURL(file);
  };


  return (
    <header className="p-12 flex items-center justify-between bg-[#e2edf2] border-b-4">
      <h1 className="text-xl font-bold">Welcome Augstine</h1>

      <div className="flex items-center justify-center gap-4">
        <button
          className="px-2 py-3 bg-[#0f6c96] rounded-md text-white border-2 hover:border-[#0F6C96] hover:text-[#0F6C96] hover:bg-transparent"
          onClick={() => changeMode(userMode === "user" ? "artisan" : "user")}
        >
          {userMode === "user" ? "Switch to Artisan" : "Switch to User "}
        </button>

        <UploadPicture onFileChange={handleFileChange} />

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

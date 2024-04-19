// Header.js
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { HiBars4 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { AuthContext } from "../../authentication/Authprovider/AuthContext";

const Header = ({ toggleAside, asideVisible }) => {
  const {changeMode, userMode} = useContext(AuthContext);
  return (
    <header className="p-12 flex items-center justify-between bg-[#e2edf2] border-b-4">
      <h1 className="text-xl font-bold">Augstine Welcome </h1>

      <button className="text-3xl lg:hidden md:hidden sm-max:block" onClick={toggleAside}>
        {asideVisible ? <LiaTimesSolid /> : <HiBars4 />}
      </button>
      <button onClick={()=>changeMode(userMode=='user'?'artisan':'user')}>
        {userMode=='user'?'Switch to Artisan':'Switch to User '}
        
      </button>
      
    </header>
  );
};

Header.propTypes = {
  toggleAside: PropTypes.func.isRequired,
  asideVisible: PropTypes.bool.isRequired,
};

export default Header;

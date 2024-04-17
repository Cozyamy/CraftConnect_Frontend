// Header.js
import React from "react";
import PropTypes from "prop-types";
import { HiBars4 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";

const Header = ({ toggleAside, asideVisible }) => {
  return (
    <header className="p-12 flex items-center justify-between bg-[#e2edf2] border-b-4">
      <h1 className="text-xl font-bold">Augstine Welcome </h1>
      <button className="text-3xl lg:hidden md:hidden sm-max:block" onClick={toggleAside}>
        {asideVisible ? <LiaTimesSolid /> : <HiBars4 />}
      </button>
    </header>
  );
};

Header.propTypes = {
  toggleAside: PropTypes.func.isRequired,
  asideVisible: PropTypes.bool.isRequired,
};

export default Header;

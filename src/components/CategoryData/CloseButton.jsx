// CloseButton.js
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const CloseButton = ({ onClose }) => {
  return (
    <AiOutlineClose
      onClick={onClose}
      className="absolute top-[-3rem] right-[-3rem] rounded-full p-2 bg-white cursor-pointer text-gray-700 text-3xl hover:text-red-600"
    />
  );
};

export default CloseButton;

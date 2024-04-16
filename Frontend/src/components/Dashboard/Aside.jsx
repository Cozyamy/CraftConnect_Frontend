import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import {
  RiUserSearchLine,
  RiShoppingCartLine,
  RiAdvertisementLine,
  RiSettingsLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import PropTypes from 'prop-types';
import { auth } from "../firebase/Firebaseconfig";

const Aside = ({ onPageChange, visible }) => {
  const navigate = useNavigate();
  const navHome=()=>{
    navigate("/")
  }

    const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [activePage, setActivePage] = useState(
    localStorage.getItem("activePage") || "Dashboard"
  );

  // Update local storage when activePage changes
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const handlePageChange = (pageName) => {
    if (activePage !== pageName) {
      setActivePage(pageName);
      onPageChange(pageName);
    }
  };

  const buttons = [
    { icon: IoHomeOutline, label: "Dashboard", page: "Page1" },
    { icon: RiUserSearchLine, label: "Browse Artisan", page: "Page2" },
    { icon: RiShoppingCartLine, label: "Order", page: "Page3" },
    { icon: RiAdvertisementLine, label: "Post Ads", page: "Page4" },
    { icon: MdOutlinePriceChange, label: "Pricing", page: "Page5" },
    { icon: MdOutlineReviews, label: "Review", page: "Page6" },
  ];

  return (
    <aside className={`bg-white w-[20rem] p-4 flex flex-col gap-16 ${visible ? 'block' : 'hidden'}`}>
      <div className="mt-[1.5rem] cursor-pointer" onClick={navHome}>
        <img src="/logo.png" alt="" />
      </div>
      <div className="mt-[1rem]">
        <ul className="relative flex flex-col gap-6">
          {buttons.map((button, index) => (
            <div
              key={index}
              className={`flex items-center justify-start gap-2 cursor-pointer p-2 rounded ${
                activePage === button.page
                  ? "bg-[#1287BB] hover:bg-[#1287BB] text-white"
                  : ""
              }`}
              onClick={() => handlePageChange(button.page)}
            >
              <button className="flex items-center justify-center gap-2 ml-6">
                <button.icon /> {button.label}
              </button>
            </div>
          ))}
          <div className="absolute bottom-[-16rem] right-0 left-0 flex flex-col gap-6">
            <li
              className={`flex items-center justify-start gap-2 cursor-pointer p-2 rounded ${
                activePage === "Settings"
                  ? "bg-[#1287BB] hover:bg-[#1287BB] text-white"
                  : ""
              }`}
              onClick={() => handlePageChange("Settings")}
            >
              <button className="flex items-center justify-center gap-2 ml-6">
                <RiSettingsLine /> Settings
              </button>
            </li>
            <li
              className={`flex items-center justify-start gap-2 cursor-pointer p-2 rounded ${
                activePage === "Logout"
                  ? "bg-[#1287BB] hover:bg-[#1287BB] text-white"
                  : ""
              }`}
              onClick={handleLogout}
            >
              <button className="flex items-center justify-center gap-2 ml-6">
                <RiLogoutBoxLine /> Logout
              </button>
            </li>
          </div>
        </ul>
      </div>
    </aside>
  );
};

Aside.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Aside;


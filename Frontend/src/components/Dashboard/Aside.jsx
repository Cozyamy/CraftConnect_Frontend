import { useState } from "react";
import { useAuth } from "../authentication/Authprovider/AuthContext";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import {
  RiUserSearchLine,
  RiHeartLine,
  RiShoppingCartLine,
  RiAdvertisementLine,
  RiCalendar2Line,
  RiSettingsLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

const Aside = ({ asideDisplay }) => {
  // State to track active button index
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const { logout } = useAuth(); // Accessing the logout function from AuthContext
  const navigate = useNavigate(); // Obtaining the navigate function

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index === activeButtonIndex ? activeButtonIndex : index);
    asideDisplay();
  };

  const menuItems = [
    { icon: RiUserSearchLine, label: "Dashboard" },
    { icon: RiUserSearchLine, label: "Browse Artisan" },
    { icon: RiHeartLine, label: "Favourite" },
    { icon: RiShoppingCartLine, label: "Order List" },
    { icon: RiAdvertisementLine, label: "Post Ads" },
    { icon: RiCalendar2Line, label: "Calendar" },
  ];

  const bottomButtons = [
    { icon: RiSettingsLine, label: "Settings" },
    { icon: RiLogoutBoxLine, label: "Logout" },
  ];

  return (
    <nav className="relative flex flex-col items-start justify-between gap-[2rem]">
      <div className="flex items-center justify-center py-4 mt-[2rem] px-2">
        <img src="./logo.png" alt="Logo" className="h-8 w-auto" />
      </div>
      <div className="flex flex-col justify-between w-full">
        <ul className="space-y-2 flex flex-col items-start justify-center ml-[1.5rem] gap-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleButtonClick(index)}
                className={`flex items-center justify-between py-2 px-4 w-full text-black rounded transition-colors duration-300 focus:outline-none hover:bg-[#1287BB] hover:text-white ${
                  activeButtonIndex === index ? "bg-[#1287BB] text-white" : ""
                }`}
              >
                <span>
                  <item.icon className="inline-block mr-2" />
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <hr className="my-4 border-t-2 border-gray-300 w-full" />
      </div>
      <div className="flex flex-col absolute gap-6 bottom-[-10rem] ml-[1.5rem]">
        {bottomButtons.map((item, index) => (
          <div key={index} onClick={() => item.label === 'Logout' ? logout().then(() => navigate('/')) : handleButtonClick(menuItems.length + index)}>
            <div className={`flex items-center justify-start gap-2 py-2 px-4 w-full hover:bg-[#1287BB] rounded hover:text-white ${activeButtonIndex === menuItems.length + index ? "bg-[#1287BB] text-white" : ""}`}>
              <item.icon />
              <button type="button">{item.label}</button>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Aside;

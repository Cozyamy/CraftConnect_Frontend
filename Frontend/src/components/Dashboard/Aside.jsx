import React, { useState, useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePriceChange } from "react-icons/md";
import {
  RiUserSearchLine,
  RiShoppingCartLine,
  RiAdvertisementLine,
  RiSettingsLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import PropTypes from 'prop-types';

const Aside = ({ onPageChange, visible }) => {
  // Get activePage from local storage or set default to "Dashboard"
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
  ];

  return (
    <aside className={`bg-gray-200 bg-white w-[20rem] p-4 flex flex-col gap-16 ${visible ? 'block' : 'hidden'}`}>
      <div className="mt-[1.5rem]">
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
              onClick={() => handlePageChange("Logout")}
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


// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Importing useNavigate

// const Aside = ({ asideDisplay }) => {
//   // State to track active button index
//   const [activeButtonIndex, setActiveButtonIndex] = useState(0);
//   const { logout } = useAuth(); // Accessing the logout function from AuthContext
//   const navigate = useNavigate(); // Obtaining the navigate function

//   const handleButtonClick = (index) => {
//     setActiveButtonIndex(index === activeButtonIndex ? activeButtonIndex : index);
//     asideDisplay();
//   };

//   const menuItems = [
//     { icon: RiUserSearchLine, label: "Dashboard" },
//     { icon: RiUserSearchLine, label: "Browse Artisan" },
//     { icon: RiHeartLine, label: "Favourite" },
//     { icon: RiShoppingCartLine, label: "Order List" },
//     { icon: RiAdvertisementLine, label: "Post Ads" },
//     { icon: RiCalendar2Line, label: "Calendar" },
//   ];

//   const bottomButtons = [
//     { icon: RiSettingsLine, label: "Settings" },
//     { icon: RiLogoutBoxLine, label: "Logout" },
//   ];

//   return (
//     <nav className="relative flex flex-col items-start justify-between gap-[2rem]">
//       <div className="flex items-center justify-center py-4 mt-[2rem] px-2">
//         <img src="./logo.png" alt="Logo" className="h-8 w-auto" />
//       </div>
//       <div className="flex flex-col justify-between w-full">
//         <ul className="space-y-2 flex flex-col items-start justify-center ml-[1.5rem] gap-4">
//           {menuItems.map((item, index) => (
//             <li key={index}>
//               <button
//                 onClick={() => handleButtonClick(index)}
//                 className={`flex items-center justify-between py-2 px-4 w-full text-black rounded transition-colors duration-300 focus:outline-none hover:bg-[#1287BB] hover:text-white ${
//                   activeButtonIndex === index ? "bg-[#1287BB] text-white" : ""
//                 }`}
//               >
//                 <span>
//                   <item.icon className="inline-block mr-2" />
//                   {item.label}
//                 </span>
//               </button>
//             </li>
//           ))}
//         </ul>
//         <hr className="my-4 border-t-2 border-gray-300 w-full" />
//       </div>
//       <div className="flex flex-col absolute gap-6 bottom-[-10rem] ml-[1.5rem]">
//         {bottomButtons.map((item, index) => (
//           <div key={index} onClick={() => item.label === 'Logout' ? logout().then(() => navigate('/')) : handleButtonClick(menuItems.length + index)}>
//             <div className={`flex items-center justify-start gap-2 py-2 px-4 w-full hover:bg-[#1287BB] rounded hover:text-white ${activeButtonIndex === menuItems.length + index ? "bg-[#1287BB] text-white" : ""}`}>
//               <item.icon />
//               <button type="button">{item.label}</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default Aside;

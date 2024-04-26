import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline,IoBookOutline, } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import {
  RiShoppingCartLine,
  RiSettingsLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";

import PropTypes from "prop-types";

import { AuthContext } from "../authentication/Authprovider/AuthContext";

import { useContext } from "react";
import Profile from "./DashProperties/Profile";

const Aside = ({ visible }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userMode,logOut } = useContext(AuthContext);
  const [showProfileModal, setShowProfileModal] = useState(false);


  const buttons = [
    { icon: IoHomeOutline, label: "Dashboard", route: "/dashboard",
    mode: "artisan" },
    { icon: IoBookOutline , label: "Book an Artisan", route: "/category" },
    // { icon: RiUserSearchLine, label: "Browse Artisan", page: "Page2" },
    { icon: RiShoppingCartLine, label: "Order", route: "/dashboard/orders" },
    {
      icon: TbSpeakerphone,
      label: "ads",
      route: "/dashboard/ads",
      mode: "artisan",
    },
    // { icon: RiAdvertisementLine, label: "Post Ads", page: "Page4", route:'/dashboard/post-ads' },
    {
      icon: MdOutlinePriceChange,
      label: "Pricing",
      route: "/dashboard/pricing",
    },
    { icon: MdOutlineReviews, label: "Review", route: "/dashboard/reviews" },
  ];

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  return (
    <aside
      className={`bg-white w-[20rem] p-4 flex flex-col gap-16 ${
        visible ? "block" : "hidden"
      }`}
    >
      <div className="mt-[1rem]">
        <div className="w-[150px] h-auto cursor-pointer mt-[1rem]" onClick={()=> navigate("/") } >
        <img src="/logo.png" alt="" className="w-full h-full" />
        </div>
        <ul className="relative flex flex-col gap-6 mt-[5rem]">
          {buttons.map((button, index) => {
            return (
              (button.mode != "artisan" || userMode == "artisan") && (
                <Link
                  key={index}
                  to={button.route}
                  className={`flex items-center justify-start gap-2 cursor-pointer p-2 rounded ${
                    location.pathname === button.route
                      ? "bg-[#1287BB] hover:bg-[#1287BB] text-white"
                      : ""
                  }`}
                >
                  <p className="flex items-center justify-center gap-2 ml-6">
                    <button.icon /> {button.label}
                  </p>
                </Link>
              )
            );
          })}

          <div className="absolute bottom-[-15rem] right-0 left-0 flex flex-col gap-6">
            <div className="flex items-center justify-start gap-2 cursor-pointer p-2 rounded hover:bg-[#1287BB] hover:text-white" onClick={toggleProfileModal}>
              <button className="flex items-center justify-center gap-2 ml-6">
                <RiSettingsLine /> Settings
              </button>
            </div>
            <div className="flex items-center justify-start gap-2 cursor-pointer p-2 rounded hover:bg-[#1287BB] hover:text-white">
              <button
                className="flex items-center justify-center gap-2 ml-6"
                onClick={logOut}
              >
                <RiLogoutBoxLine /> Logout
              </button>
            </div>
          </div>
        </ul>
      </div>

      {showProfileModal && <Profile setShowProfileModal={setShowProfileModal} />
    }

    </aside>
  );
};

Aside.propTypes = {
  onPageChange: PropTypes.func,
  visible: PropTypes.bool.isRequired,
};

export default Aside;

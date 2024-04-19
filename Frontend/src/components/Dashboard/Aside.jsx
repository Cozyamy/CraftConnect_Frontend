import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import {
  RiShoppingCartLine,
  RiSettingsLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import PropTypes from "prop-types";

import { AuthContext } from "../authentication/Authprovider/AuthContext";
import { auth } from "../firebase/Firebaseconfig";
import { useContext } from "react";

const Aside = ({ visible }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userMode } = useContext(AuthContext);
  const navHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const buttons = [
    { icon: IoHomeOutline, label: "Dashboard", route: "/dashboard" },
    // { icon: RiUserSearchLine, label: "Browse Artisan", page: "Page2" },
    { icon: RiShoppingCartLine, label: "Order", route: "/dashboard/orders" },
    {
      icon: RiShoppingCartLine,
      label: "Ads",
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

  return (
    <aside
      className={`bg-white w-[20rem] p-4 flex flex-col gap-16 ${
        visible ? "block" : "hidden"
      }`}
    >
      <div className="mt-[1rem]">
        <ul className="relative flex flex-col gap-6">
          {buttons.map((button, index) => {
            return (
              ((button.mode != "artisan") ||  userMode =='artisan' ) &&  (
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

          <div className="absolute bottom-[-12rem] right-0 left-0 flex flex-col gap-6">
            <div className="flex items-center justify-start gap-2 cursor-pointer p-2 rounded hover:bg-[#1287BB] hover:text-white">
              <button className="flex items-center justify-center gap-2 ml-6">
                <RiSettingsLine /> Settings
              </button>
            </div>
            <div className="flex items-center justify-start gap-2 cursor-pointer p-2 rounded hover:bg-[#1287BB] hover:text-white">
              <button
                className="flex items-center justify-center gap-2 ml-6"
                onClick={handleLogout}
              >
                <RiLogoutBoxLine /> Logout
              </button>
            </div>
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

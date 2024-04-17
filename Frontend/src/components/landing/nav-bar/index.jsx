import { NavLink, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { HiOutlineBars4 } from "react-icons/hi2";
import logoheader from "/Logo-header.svg";
import "./index.css";
import { useAuth } from "../../authentication/Authprovider/AuthContext";
import WhatsCraft from "../whatsCraft/index";

export function NavBar({ showLinks = true, showLogoutButton = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log("Users:", user);

  const handleLogout = () => {
    logout()
      .then(() => {
        setShowLogoutConfirmation(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const toggleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { text: "Home", to: "/" },
    { text: "About", to: "/about" },
    { text: "Services", to: "/WhatsCraft" },
    { text: "Contact", to: "/contact" },
  ];

  return (
    <Fragment>
      <header className="header sticky-header sticky top-0 bg-white shadow-[0_12px_40px_0_rgba(31,29,29,0.05)] z-[1000]">
        <div className="header__wrapper flex flex-row py-4 mx-auto my-0 lg:max-w-[90%] max-w-[90%] justify-between items-center">
          <div className="sm-max:w-[150px] md-max:w-[150px]">
            <a href="/">
              <img
                src={logoheader}
                alt="header_logo"
                className="sm-max:w-full"
              />
            </a>
          </div>
          {showLinks && (
            <ul
              className={`flex items-center justify-center gap-8 sm-max:absolute sm-max:bg-white sm-max:shadow ${
                isMenuOpen ? "sm-max:top-[4rem]" : "sm-max:top-[-100rem]"
              } sm-max:left-0 sm-max:right-0 sm-max:w-full sm-max:flex sm-max:flex-col sm-max:items-start sm-max:gap-4 sm-max:px-7 sm-max:py-2 transition-all duration-300 md-max:gap`}
            >
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className="links text-[18px] hover:text-[#1287BB]"
                >
                  <NavLink
                    to={link.to}
                    style={{
                      color:
                        window.location.pathname === link.to
                          ? "#1287BB"
                          : "black",
                    }}
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
              {!user && (
                <div className="sign flex gap-2 lg:hidden md:hidden sm-max:flex">
                  <CtaBtn text="Sign Up" to="/signup" />
                  <CtaBtn text="Login" to="/login" />
                </div>
              )}

              {showLinks && (
                <div className="flex gap-2 lg:hidden md:hidden sm-max:flex">
                  {!user && (
                    <div className="sign flex gap-2 sm-max:hidden">
                      <CtaBtn text="Sign Up" to="/signup" />
                      <CtaBtn text="Login" to="/login" />
                    </div>
                  )}
                  {user && (
                    <button
                      onClick={function () {
                        navigate("/dashboard");
                      }}
                      className="border:solid border-2 border-[#1287BB] text-white bg-[#1287BB] rounded-lg p-3 font-medium hover:bg-transparent hover:text-[#1287BB]"
                    >
                      Dashboard
                    </button>
                  )}
                  {user && (
                    <button
                      onClick={() => setShowLogoutConfirmation(true)}
                      className="border:solid border-2 border-[#1287BB] text-white bg-[#1287BB] rounded-lg p-3 font-medium hover:bg-transparent hover:text-[#1287BB]"
                    >
                      {user.displayName
                        ? user.displayName.substring(0, 2)
                        : "Logout"}
                    </button>
                  )}
                </div>
              )}
            </ul>
          )}

          <div className="flex gap-2">
            {showLogoutButton && (
              <button
                onClick={function () {
                  navigate("/dashboard");
                }}
                className="border:solid border-2 border-[#1287BB] text-white bg-[#1287BB] rounded-lg p-3 font-medium hover:bg-transparent hover:text-[#1287BB]"
              >
                Dashboard
              </button>
            )}
            {user && showLogoutButton && (
              <button
                onClick={() => setShowLogoutConfirmation(true)}
                className="border:solid border-2 border-[#1287BB] text-white bg-[#1287BB] rounded-lg p-3 font-medium hover:bg-transparent hover:text-[#1287BB]"
              >
                {user.displayName ? user.displayName.substring(0, 2) : "Logout"}
              </button>
            )}
          </div>

          <>
            {showLinks && (
              <div className="flex gap-2 sm-max:hidden">
                {!user && (
                  <div className="sign flex gap-2">
                    <CtaBtn text="Sign Up" to="/signup" />
                    <CtaBtn text="Login" to="/login" />
                  </div>
                )}
                {user && (
                  <button
                    onClick={function () {
                      navigate("/dashboard");
                    }}
                    className="border:solid border-2 border-[#1287BB] text-white bg-[#1287BB] rounded-lg p-3 font-medium hover:bg-transparent hover:text-[#1287BB]"
                  >
                    Dashboard
                  </button>
                )}
                {user && (
                  <button
                    onClick={() => setShowLogoutConfirmation(true)}
                    className="border:solid border-2 border-[#1287BB] text-white bg-[#1287BB] rounded-lg p-3 font-medium hover:bg-transparent hover:text-[#1287BB]"
                  >
                    {user.displayName
                      ? user.displayName.substring(0, 2)
                      : "Logout"}
                  </button>
                )}
              </div>
            )}
          </>
          {showLinks && (
            <div
              className="navBurger text-2xl cursor-pointer bg-[#efecec] shadow p-1 rounded lg:hidden"
              onClick={toggleClick}
            >
              <HiOutlineBars4 />
            </div>
          )}

          {showLogoutConfirmation && (
            <div className="modal fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="modal-content bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to log out?
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="bg-[#1287BB] text-white px-4 py-2 rounded-lg hover:bg-transparent hover:text-[#1287BB] border border-[#1287BB]"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirmation(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-transparent hover:text-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </Fragment>
  );
}

function CtaBtn({ text, to }) {
  return (
    <Fragment>
      <NavLink
        to={to}
        className="border:solid border-2 border-[#1287BB] text-white text-[18px] bg-[#1287BB] rounded-lg p-3 font-medium hover:bg-transparent hover:text-[#1287BB]"
      >
        <span>{text}</span>
      </NavLink>
    </Fragment>
  );
}

export default NavBar;

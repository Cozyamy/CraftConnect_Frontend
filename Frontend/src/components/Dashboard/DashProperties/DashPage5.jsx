import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";


const DashPage5 = () => {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSlideIn(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="justify-center text-[#0F6C96] ">
        <div>
          <h1
            className={`text-3xl font-extrabold text-center pb-3 transition-transform duration-500 transform ${
              slideIn ? "translate-y-0" : "translate-y-full"
            }`}>
            FLEXIBLE & AFFORDABLE PLANS
          </h1>
          <h1
            className={`text-xl font-medium text-center pb-5 text-black transition-transform duration-500 transform ${
              slideIn ? "translate-y-0" : "translate-y-full"
            }`}
          >
            Transparent and Flexible Pricing For All Your Needed Services
          </h1>
        </div>

        <div className="Card_cont justify-center flex gap-20 sm:flex-wrap">
          <div
            className={`rounded-xl py-10 w-[350px] shadow-2xl shadow-[#0F6C96] bg-white transition-transform duration-500 transform ${
              slideIn ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <h2 className="text-2xl font-bold px-5">FREE PLAN</h2>
            <div className="flex px-5 items-center">
              <h2 className="text-2xl font-bold ">
                <FaNairaSign />
              </h2>
              <h2 className="text-3xl font-bold ">0</h2>
            </div>
            <div className="mt-2 mb-4 border-b border-solid border-[#0F6C96] px-5 "></div>
            <div className="px-5">
              <p>Showcase your work and Connect with potential customers.</p>
              <div className="mt-4">
                <p className="font-semibold pb-5">Benefits:</p>
                <ul className="list-disc ml-6 flex flex-col gap-3 pb-3">
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>List One Artisan Ad</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>Manage your profile</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>Receive customer enquiries</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>Free basic analysis</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaTimesCircle className="text-red-500" />
                    <p>Priority Listing Placement</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaTimesCircle className="text-red-500" />
                    <p>Featured Artisan badge</p>
                  </div>
                </ul>
                <button className="border border-black rounded-3xl px-5 py-3 w-full bg-gray-300">
                  <span className="flex items-center justify-center gap-2 cursor-not-allowed">
                    <span className='text-gray-400'>Subscribed</span>
                    <FaCheckCircle className="text-gray-500 " />
                  </span>{" "}
                </button>
              </div>  
            </div>
          </div>
          

          <div
            className={`rounded-xl py-10 w-[350px] shadow-2xl shadow-[#0F6C96] bg-white transition-transform duration-500 transform ${
              slideIn ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <h2 className="text-2xl font-bold px-5">PREMIUM PLAN</h2>
            <div className="flex px-5 items-center">
              <h2 className="text-2xl font-bold ">
                <FaNairaSign />
              </h2>
              <h2 className="text-3xl font-bold ">50k</h2>
            </div>
            <div className="mt-2 mb-4 border-b border-solid border-[#0F6C96] px-5 "></div>
            <div className="px-5">
              <p>Maximize your reach and grow your business</p>
              <div className="mt-4">
                <p className="font-semibold pb-5">Benefits:</p>
                <ul className="list-disc ml-6 flex flex-col gap-3 pb-3">
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>List Unlimited Artisan Ads</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>Manage your profile</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>Receive customer enquiries</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>Advanced analytics</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>Priority Listing Placement</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaCheckCircle className="text-[#0F6C96]" />
                    <p>Featured Artisan badge</p>
                  </div>
                </ul>
                <button className="hover:bg-[#E2EDF2] hover:font-bold border border-black rounded-3xl px-5 py-3 w-full">
                  <span className="flex items-center justify-center gap-2">
                    <span>Subscribe</span>
                    <FaCheckCircle className="text-[#0F6C96] " />
                  </span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashPage5;

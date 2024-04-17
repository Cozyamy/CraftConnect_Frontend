import React from "react";
import { CiWallet } from "react-icons/ci";
import { IoIosCube } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";

const DashPage1 = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex">
          <div className="bg-white w-[16rem] h-[7rem] rounded-md p-2 flex flex-col gap-4 sm-max:w-[13rem]">
            <div className="flex items-center justify-between">
              <small>Wallet</small>
              <div className="bg-[#e5e4ff] w-[2rem] h-[2rem] rounded-full flex items-center justify-center">
                <CiWallet className="text-[#8280FF] text-[1.4rem]" />
              </div>
            </div>
            <h1 className="text-[1.3rem] font-semibold">NGN 50, 985</h1>
          </div>
          <div className="bg-white w-[16rem] h-[7rem] rounded-md p-2 flex flex-col gap-4  sm-max:w-[13rem]">
            <div className="flex items-center justify-between">
              <small>Total Jobs</small>
              <div className="bg-[#fff3d6] w-[2rem] h-[2rem] rounded-full flex items-center justify-center">
                <IoIosCube className="text-[#FEC53D] text-[1.4rem]" />
              </div>
            </div>
            <h1 className="text-[1.3rem] font-semibold">110</h1>
          </div>
          <div className="bg-white w-[16rem] h-[7rem] rounded-md p-2 flex flex-col gap-4  sm-max:w-[13rem]">
            <div className="flex items-center justify-between">
              <small>Completed</small>
              <div className="bg-[#d9f7e8] w-[2rem] h-[2rem] rounded-full flex items-center justify-center">
                <FaCircleCheck className="text-[#4AD991] text-[1.4rem]" />
              </div>
            </div>
            <h1 className="text-[1.3rem] font-semibold">12</h1>
          </div>
          <div className="bg-white w-[16rem] h-[7rem] rounded-md p-2 flex flex-col gap-4  sm-max:w-[13rem]">
            <div className="flex items-center justify-between">
              <small>pending</small>
              <div className="bg-[#ffded1] w-[2rem] h-[2rem] rounded-full flex items-center justify-center">
                <FaClockRotateLeft className="text-[#FF9066] text-[1.4rem]" />
              </div>
            </div>
            <h1 className="text-[1.3rem] font-semibold">98</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashPage1;
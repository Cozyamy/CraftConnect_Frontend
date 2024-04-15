// Dashboard.js
import React, { useState } from "react";
import Aside from "../Dashboard/Aside";
import DashPage1 from "./DashProperties/DashPage1";
import DashPage2 from "./DashProperties/DashPage2";
import DashPage5 from "./DashProperties/DashPage5";
import Header from "./DashProperties/HeaderDash";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("Page1");
  const [asideVisible, setAsideVisible] = useState(true);

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  const toggleAside = () => {
    setAsideVisible(!asideVisible);
  };

  return (
    <div className="flex h-screen overflow-x-auto">
      <Aside onPageChange={handlePageChange} visible={asideVisible} />
      <div className="flex flex-col w-full">
        <Header toggleAside={toggleAside} className="sticky" />
        <div className="p-4 bg-[#e2edf2] h-screen">
          {currentPage === "Page1" && <DashPage1 />}
          {currentPage === "Page2" && <DashPage2 />}
          {currentPage === "Page5" && <DashPage5 />}
          {/* Add more pages here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

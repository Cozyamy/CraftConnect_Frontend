import React, { useState } from "react";
import Aside from "../Dashboard/Aside";
import DashPage1 from "./DashProperties/DashPage1";
import DashPage2 from "./DashProperties/DashPage2";
import DashPage3 from "./DashProperties/DashPage3";
import DashPage5 from "./DashProperties/DashPage5";
import DashPage6 from "./DashProperties/DashPage6";
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
    <div className="flex h-screen">
      <Aside
        onPageChange={handlePageChange}
        visible={asideVisible}
        toggleAside={toggleAside}
        className={`fixed left-0 top-0 h-full ${
          asideVisible ? "block" : "hidden"
        }`}
      />
      <div className="flex flex-col w-full">
        <Header toggleAside={toggleAside} asideVisible={asideVisible} className="fixed top-0 w-full z-10" />
        <div className="p-4 bg-[#e2edf2] h-screen w-full overflow-y-auto">
          {currentPage === "Page1" && <DashPage1 />}
          {currentPage === "Page2" && <DashPage2 />}
          {currentPage === "Page3" && <DashPage3 />}
          {currentPage === "Page5" && <DashPage5 />}
          {currentPage === "Page6" && <DashPage6 />}
          {/* Add more pages here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

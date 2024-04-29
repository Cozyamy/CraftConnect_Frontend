import { useState } from "react";
import Aside from "../Dashboard/Aside";
import Header from "./DashProperties/HeaderDash";
// import { NavBar } from "../landing";

const DashboardContainer = ({children}) => {
  const [asideVisible, setAsideVisible] = useState(true);



  const toggleAside = () => {
    setAsideVisible(!asideVisible);
  };

  return (
    <>

    {/* <NavBar showLinks={false} showLogoutButton={true} toggleAside={toggleAside} asideVisible={asideVisible} /> */}
    <div className="flex h-screen">
      <Aside

        visible={asideVisible}
        toggleAside={toggleAside}
        className={`fixed left-0 top-0 h-full ${
          asideVisible ? "block" : "hidden"
        }`}
      />
          <div className="flex flex-col w-full">
       
        <Header toggleAside={toggleAside} asideVisible={asideVisible} className="fixed top-0 w-full z-10" />
        <div className="p-4 bg-[#e2edf2] h-screen w-full overflow-y-auto">
    {children}
    </div>
      </div>
 
    </div>
    </>
  );
};

export default DashboardContainer;

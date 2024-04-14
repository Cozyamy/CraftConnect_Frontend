import { useState, useEffect } from "react";
import MainDash from "./DashProperties/MainDash";
import Aside from "./Aside";
import DashTile from "./DashProperties/DashTile";

export default function DashboardLayout({ children }) {
  const [showAside, setShowAside] = useState(false);

  const asideDisplay = () => {
    setShowAside((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowAside(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full max-w-[2000px] mx-auto h-screen flex bg-[#020202] text-black">
      <aside className="w-[300px] bg-white hidden md:block border-r-2 border-[#E6E6E6] ">
        <Aside />
      </aside>

      <aside
        className={`w-[300px] md:hidden bg-white border-r-2 border-[#E6E6E6] fixed top-0 bottom-0 z-50 transition-all duration-500 sm-max:w-[220px] ${
          showAside ? "left-0" : "-left-[200%]"
        }`}
      >
        <Aside asideDisplay={asideDisplay} />
      </aside>

      <main
        className={`dash-bg-image bg-[#E2EDF2] relative w-full overflow-y-auto overflow-x-hidden`}
      >
        <header
          className={`p-5 sticky z-10 top-0 w-full bg-[#E2EDF2] border-b-2 shadow-sm border-[#E6E6E6] bg-[url('../../../../src/assets/images/dashboard/bg_ellipse1.png ')] bg-no-repeat bg-[top_right]`}
        >
          <div className="h-14 w-full flex justify-end items-center gap-5">
            <div className="w-full">Welcome Austin Catherine</div>

            <div
              className="relative md:hidden w-5 h-[20px] flex flex-col items-center justify-between cursor-pointer mr-[1.5rem]"
              onClick={asideDisplay}
            >
              <div
                className={`absolute left-0 w-7 h-1 bg-black/80 transition-all duration-500 ${
                  showAside ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              ></div>
              <div
                className={`absolute left-0 w-7 h-1 bg-black/80  transition-all duration-300 ${
                  showAside
                    ? "top-1/2 -translate-y-1/2 rotate-[2000deg] opacity-0"
                    : "top-1/2 -translate-y-1/2"
                }`}
              ></div>
              <div
                className={`absolute left-0 w-7 h-1 bg-black/80  transition-all duration-500 ${
                  showAside ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              ></div>
            </div>
          </div>
        </header>
        
        <div className="flex p-5 relative">
          <div className="w-full p-2 md:p-5">{children}</div>
          <div className="px-16 py-2 w-full flex flex-col gap-4">
          <DashTile/>
          <MainDash/>
          </div>
        </div>

        
      </main>
    </div>
  );
}

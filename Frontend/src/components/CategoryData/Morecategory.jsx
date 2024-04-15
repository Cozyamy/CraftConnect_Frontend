import React, { useState, useEffect } from "react";
import { Footer, NavBar } from "../landing";
import axios from "axios"

const Morecategory = () => {
  const [artisans, setArtisans] = useState([]);
  const apiUrl = "https://8a94-102-90-66-216.ngrok-free.app/api/v1/artisans/all";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setArtisans(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);


  return (
    <>
      <div>
        <NavBar showLinks={false} showLogoutButton={true} />
        <div className="pt-20 mb-8">
          <div className="fixed top-[85px] left-0 right-0 z-10 bg-white">
            <div className="container mx-auto py-4 px-6">
              <div className="flex items-center justify-between">
                <div>
                  {/* Add search field here */}
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Morecategory;

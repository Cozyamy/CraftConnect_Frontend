import React, { useState } from "react";
import { AdsList } from "./AdsList";
import { CreateAdsForm } from "./CreateAds";

const DashPage4 = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [ads, setAds] = useState([]);
  
  const handleCreateAds = (ad) => {
    setAds([...ads, ad]);
    setIsCreating(false);
  };

  return (
    <div>
      {isCreating ? (
        <CreateAdsForm close={() => setIsCreating(false)} onCreate={handleCreateAds} />
      ) : (
        <AdsList ads={ads}>
          <button className="btn bg-[#0F6C96] py-2 px-2 rounded text-white mb-6" onClick={() => setIsCreating(!isCreating)}>Add new</button>
        </AdsList>
      )}
    </div>
  );
};

export default DashPage4;

import React, { useState, useEffect } from "react";
import {AdsList} from "./AdsList"
import { CreateAdsForm } from "./CreateAds";


const DashPage4 = () => {

  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) return <CreateAdsForm close={()=>setIsCreating(false)}/>
  return (
    <AdsList>
      <button className="btn" onClick={()=>setIsCreating(!isCreating)}> Add new </button>
    </AdsList>
  );
};

export default DashPage4;

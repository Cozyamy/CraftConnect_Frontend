import React from 'react';
import Morecategory from '../../CategoryData/Morecategory';

const DashPage1 = () => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="mb-4">
        <Morecategory showHeader={false} showSearch={false} showFooter={false}/>
      </div>
      
    </div>
  );
};

export default DashPage1;



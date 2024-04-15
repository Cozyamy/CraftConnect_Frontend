import React from 'react';
import ArtisanOverviewChart from './LineChart';

const Dashboard = () => {
    const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Number of Artisans',
        data: [5, 10, 20, 30, 75, 40, 45, 80, 55, 15, 25, 90],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className='flex items-center flex-col justify-center shadow w-full bg-white rounded'>
     <div className='w-full'>
     <h1>Artisan Overview</h1>
      
      <ArtisanOverviewChart data={data} />
     </div>
    </div>
  );
};

export default Dashboard;

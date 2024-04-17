// Dashboard.jsx

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
    <div className='p-4 bg-white rounded shadow'>
      <h1 className="text-xl font-semibold mb-4">Artisan Overview</h1>
      <div className='w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3'>
        <ArtisanOverviewChart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;

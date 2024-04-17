import React from 'react';

const DashPage3 = () => {
  // Sample orders data
  const orders = [
    { category: 'Plumber', date: '2024-03-25', status: 'Completed' },
    { category: 'Mechanic', date: '2024-03-28', status: 'Completed' },
    { category: 'Barber', date: '2024-04-07', status: 'Completed' },
    { category: 'Gardener', date: '2024-04-07', status: 'Pending' },
    { category: 'Carpenter', date: '2024-04-08', status: 'Completed' },
    { category: 'Chef', date: '2024-04-10', status: 'Completed' },
    { category: 'Cleaner', date: '2024-04-12', status: 'Pending' },
    { category: 'HairDresser', date: '2024-04-14', status: 'Completed' },
    { category: 'Mason', date: '2024-04-15', status: 'Pending' },
    { category: 'Photographer', date: '2024-04-16', status: 'Pending' },
    { category: 'Painter', date: '2024-04-16', status: 'Pending' },
    { category: 'Roofer', date: '2024-04-17', status: 'Pending' },
  ];

    return (
    <div className='mx-4'>
        <h1 className='text-3xl font-bold'>Most Recent Orders</h1>    
    <div className="w-full overflow-hidden rounded-xl  shadow-lg shadow-[#0F6C96] mt-8 ">
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white ">
          <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">S/N</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left ">Date</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-5 text-left">{order.category}</td>
                <td className="py-3 text-left">{order.date}</td>
                <td className="py-3 px-6 text-left">
                  {order.status === 'Completed' ? (
                    <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
);
};

export default DashPage3;

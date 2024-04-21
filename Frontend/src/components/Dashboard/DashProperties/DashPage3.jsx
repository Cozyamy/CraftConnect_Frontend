import React, { useState } from 'react';
import { HiOutlineSelector } from 'react-icons/hi';

const DashPage3 = ({ isArtisan }) => {
  // Sample orders data
  const initialOrders = [
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

  // State to hold orders
  const [orders, setOrders] = useState(initialOrders);

  // Function to handle status change
  const handleStatusChange = (index, newStatus) => {
    setOrders(prevOrders => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index].status = newStatus;
      return updatedOrders;
    });
  };

  return (
    <div className='mx-4'>
      <h1 className='text-3xl font-bold'>Most Recent Orders</h1>
      <div className="w-full overflow-hidden rounded-xl shadow-lg shadow-[#0F6C96] mt-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">S/N</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Date</th>
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
                    {isArtisan ? (
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                        className="bg-transparent border-none focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Declined">Declined</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    ) : (
                      <div className="relative inline-block">
                        <button className={`py-1 px-4 ml-2 rounded-full text-white flex items-center ${
                          order.status === 'Completed' || order.status === 'Delivered'
                            ? 'bg-[#0F6C96]'
                            : order.status === 'Pending'
                            ? 'bg-yellow-300'
                            : 'bg-red-300'
                        }`}>
                          {order.status} <HiOutlineSelector className="ml-1 h-4 w-4" />
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(index, e.target.value)}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
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

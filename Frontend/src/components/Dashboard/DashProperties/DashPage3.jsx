import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserOrders, getArtisanOrders } from "../../authentication/Api";
import { HiOutlineSelector } from 'react-icons/hi';

const DashPage3 = ({ isArtisan }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (isArtisan) {
          response = await getArtisanOrders();
        } else {
          response = await getUserOrders();
        }
        setOrders(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isArtisan]);

  const handleStatusChange = async (index, newStatus) => {
    try {
      const updatedOrders = [...orders];
      updatedOrders[index].status = newStatus;
      setOrders(updatedOrders);
      // You need to update the status in the backend here
      // For simplicity, let's assume you have a function to update the status
      // For example:
      await updateOrderStatus(updatedOrders[index].id, newStatus);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className='mx-4'>
      <h1 className='text-3xl font-bold'>Most Recent Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : orders.length === 0 ? (
        <p className = 'text-3xl mt-10 text-[#0F6C96]'
        >No Orders</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">S/N</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Service</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{order.name}</td>
                  <td className="py-3 px-6 text-left">{order.phone}</td>
                  <td className="py-3 px-6 text-left">{order.category}</td>
                  <td className="py-3 px-6 text-left">{order.date}</td>
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
      )}
    </div>
  );
};

export default DashPage3;

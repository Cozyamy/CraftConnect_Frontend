import React, { useState, useEffect } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";

export const AdsList = ({ children }) => {
  const [ads, setAds] = useState([]);

  return (
    <div className="container mx-auto py-8 px-5 rounded-3xl bg-white">
      <div className="mt-8">
        <div className="flex w-full justify-between items-center ">
          <h2 className="text-lg font-semibold mb-4">Your Ads</h2>
          {children}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads?.map((ad) => (
            <div key={ad.id} className="bg-gray-100 p-4 rounded">
              <img
                src={ad.picture_1}
                alt="Ad Preview"
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <p className="text-lg font-semibold mb-2">{ad.category}</p>
              <p className="text-sm text-gray-600 mb-2">{ad.location}</p>
              <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
              <p className="text-sm text-gray-600 mb-2">Price: ₦{ad.price}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEditClick(ad)}
                  className="text-blue-500 hover:text-blue-600 focus:outline-none"
                >
                  <TiPencil className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(ad.id)}
                  className="text-red-500 hover:text-red-600 focus:outline-none"
                >
                  <IoTrashBinOutline className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

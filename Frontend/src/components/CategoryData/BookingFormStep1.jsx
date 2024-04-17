// BookingFormStep1.js
import React, { useState } from "react";

const BookingFormStep1 = ({ category, onNext }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const handleNext = () => {
    // Validate inputs if needed
    onNext({ name, price, location });
  };

  return (
    <div className="p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <p className="mb-4">{category.description}</p>
      <div className="w-32 h-24 mb-4">
          <img src={category.image} alt="" className="w-full h-full rounded-md" />
        </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="location"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <button
        onClick={handleNext}
        className="bg-[#1287BB] text-white px-4 py-2 rounded-md transition-opacity duration-300 hover:opacity-90 focus:outline-none focus:ring focus:ring-blue-400"
      >
        Next
      </button>
    </div>
  );
};

export default BookingFormStep1;

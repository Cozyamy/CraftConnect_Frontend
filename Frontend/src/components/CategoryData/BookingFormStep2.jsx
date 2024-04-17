import React, { useState } from "react";

const BookingFormStep2 = ({ bookingDetails, onSubmit, onInputChange, onPrevious }) => {
  const [name, setName] = useState(""); // Define 'name' state variable

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs if needed
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
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
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={bookingDetails.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={bookingDetails.phoneNumber}
          onChange={(e) => onInputChange("phoneNumber", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="workDetail"
        >
          Work Detail
        </label>
        <textarea
          id="workDetail"
          value={bookingDetails.workDetail}
          onChange={(e) => onInputChange("workDetail", e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full h-24 resize-none"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-[#1287BB] text-white px-4 py-2 rounded-md  transition-opacity duration-300 hover:opacity-90 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BookingFormStep2;

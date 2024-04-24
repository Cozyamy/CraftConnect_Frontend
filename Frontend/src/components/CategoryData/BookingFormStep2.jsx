import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const BookingFormStep2 = ({ formData, onSubmit, onInputChange, onPrevious }) => {
  const { name, email, phoneNumber, workDetail } = formData;

  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    setIsFormValid(name !== "" && email !== "" && phoneNumber !== "" && workDetail !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit();
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  };

  return (
    <div>
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
            onChange={(e) => onInputChange("name", e.target.value)}
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
            value={email}
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
            value={phoneNumber}
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
            value={workDetail}
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
            disabled={!isFormValid}
            className={`bg-[#1287BB] text-white px-4 py-2 rounded-md transition-opacity duration-300 focus:outline-none focus:ring focus:ring-blue-400 ${!isFormValid ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
          >
            Submit
          </button>
        </div>
      </form>
      {showModal && (
        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg">
          <p>Congratulations for booking a service!</p>
        </div>
      )}
    </div>
  );
};

BookingFormStep2.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    workDetail: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default BookingFormStep2;

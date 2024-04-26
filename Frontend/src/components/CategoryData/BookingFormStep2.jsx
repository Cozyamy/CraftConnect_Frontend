import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "../authentication/Api";
import Cookies from "js-cookie";

const BookingFormStep2 = ({ formData, onSubmit, onInputChange, onPrevious }) => {
  const { first_name, last_name, email, phone_number, workdetails } = formData;

  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    setIsFormValid(
      first_name !== "" &&
        last_name !== "" &&
        email !== "" &&
        phone_number !== "" &&
        workdetails !== ""
    );
  };

  const createBooking = async (formData) => {
    try {
      const token = Cookies.get('token');
      const res = await axios.post(`${apiKey}create_booking/1`, formData, { 
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
        },
      });
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isFormValid) {
      try {
        const res = await createBooking(formData);
        console.log(res.data); // Handle response as needed
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      } catch (error) {
        console.error("Error creating booking:", error.message);
        // Handle error as needed
      }
    }
  };

  const Overlay = () => <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>;

  const SuccessModal = () => (
    <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg">
      <p>Congratulations for booking a service!</p>
      <img src="green-checkmark.png" alt="Green Checkmark" className="mt-4" />
    </div>
  );

  return (
    <div>
      {showModal && <Overlay />}
      <form onSubmit={handleSubmit} className="p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="first_name"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={(e) => onInputChange("first_name", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="last_name"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={(e) => onInputChange("last_name", e.target.value)}
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
            htmlFor="phone_number"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone_number"
            placeholder="+2347078645343"
            value={phone_number}
            onChange={(e) => onInputChange("phone_number", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="workdetails"
          >
            Work Details
          </label>
          <textarea
            id="workdetails"
            value={workdetails}
            onChange={(e) => onInputChange("workdetails", e.target.value)}
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
      {showModal && <SuccessModal />}
    </div>
  );
};

BookingFormStep2.propTypes = {
  formData: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    workdetails: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default BookingFormStep2;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { baseUrl } from "../authentication/Api"


const BookingFormStep1 = ({ service, onNext }) => {
  const [price, setPrice] = useState("");
  const [picture_1_url, setpicture_1_url] = useState("");
  const [location, setLocation] = useState("");
  const [description, setdescription] = useState("");
  

  useEffect(() => {
    if (service) {
      setpicture_1_url(service.picture_1_url);
      setPrice(service.price);
      setLocation(service.location);
      setdescription(service.description); 
    }
  }, [service]);

  const handleNext = () => {
    onNext({ picture_1_url, description, name, price, location });
  };

  return (
    <div className="p-8 rounded-lg">

      <div className="max-w-full rounded-sm mb-2">
        <div className="h-[200px] rounded-sm">
        <img src={`${baseUrl}${picture_1_url}`}
 className="w-full h-full object-cover rounded-sm" />
        </div>
      </div>

      <div className="mb-2">
        <h1 className="block text-gray-700 text-sm font-bold">Description</h1>
        <p>{description}</p>
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
          disabled
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
          disabled
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

BookingFormStep1.propTypes = {
  service: PropTypes.shape({
    picture_1_url: PropTypes.string,
    price: PropTypes.number,
    location: PropTypes.string,
    description: PropTypes.string
  }),
  onNext: PropTypes.func.isRequired
};

export default BookingFormStep1;

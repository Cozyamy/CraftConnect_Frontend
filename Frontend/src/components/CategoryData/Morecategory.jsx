import { useState, useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { NavBar, Footer } from "../landing";
import Modal from "./Modal";
import { getCategories, getServices } from "../authentication/Api";
import PropTypes from "prop-types"; 
// import { apiKey } from "../authentication/Api";

const Morecategory = ({
  showHeader = true,
  showSearch = true,
  showFooter = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState(10);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices(selectedCategory?.name);
        console.log({ services: response.data });
        setServices(response.data);
      } catch (error) {
        // console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [selectedCategory]);

  useEffect(() => {
    const updateVisibleCategories = () => {
      if (window.innerWidth < 338) {
        setVisibleCategories(1);
      } else if (window.innerWidth < 468) {
        setVisibleCategories(2);
      } else if (window.innerWidth < 664) {
        setVisibleCategories(4);
      } else if (window.innerWidth < 964) {
        setVisibleCategories(5);
      } else if (window.innerWidth < 1130) {
        setVisibleCategories(7);
      } else if (window.innerWidth < 1300) {
        setVisibleCategories(8);
      } else {
        setVisibleCategories(12);
      }
    };

    updateVisibleCategories();

    window.addEventListener("resize", updateVisibleCategories);
    return () => window.removeEventListener("resize", updateVisibleCategories);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Filter categories based on searchQuery
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCategories(filtered);
    setSelectedCategory(null);
    setActiveIndex(null);
  };

  const handleCategoryClick = (category, idx) => {
    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(category.toLowerCase())
    );
    setCategories(filtered);
    setSelectedCategory(category);
    setActiveIndex(idx);
  };

  const handleShowAll = () => {
    setCategories(categories);
    setSelectedCategory(null);
    setActiveIndex(null);
  };

  const handlePrevClick = () => {
    setStartIndex(Math.max(startIndex - 1, 0));
    setActiveIndex(null);
  };

  const handleNextClick = () => {
    setStartIndex(
      Math.min(startIndex + 1, categories.length - visibleCategories)
    );
    setActiveIndex(null);
  };

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        {showHeader && <NavBar showLinks={false} showLogoutButton={true} />}
        <div className="pt-20 mb-8">
          {showSearch && (
            <div className="fixed top-[85px] left-0 right-0 z-10 bg-white">
              <div className="container mx-auto py-4 px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <input
                      type="text"
                      placeholder="Search Artisan"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      className="border border-gray-300 rounded-md p-2 outline-none"
                    />
                    <button
                      onClick={handleSearch}
                      className="bg-[#1287BB] text-white px-4 py-2 rounded-md ml-2 transition-opacity duration-300 hover:opacity-90"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="container mx-auto mt-[-1.5rem] sticky top-[120px]">
            <hr className="my-4 border-t-2 border-gray-300 w-full" />
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrevClick}
                className="flex items-center justify-center w-8 h-8 bg-[#1287BB] text-white rounded-full mr-2 mt-5 transition-opacity duration-300 hover:opacity-90"
                disabled={startIndex === 0}
              >
                <IoChevronBackOutline />
              </button>
              <div className="flex flex-wrap gap-2 md:gap-4 sm:gap-1 justify-center bg-white z-10 py-4 overflow-x-hidden">
                <div
                  className={`cursor-pointer bg-gray-200 px-4 py-2 rounded-md ${
                    selectedCategory === null
                      ? "bg-[#1287BB] text-[#1287BB]"
                      : ""
                  } transition-colors duration-300`}
                  onClick={handleShowAll}
                >
                  All
                </div>
                {categories
                  .slice(startIndex, startIndex + visibleCategories)
                  .map((category, idx) => (
                    <div
                      key={idx}
                      className={`cursor-pointer bg-gray-200 px-4 py-2 rounded-md capitalize ${
                        selectedCategory === category.name ||
                        activeIndex === idx
                          ? "bg-[#1287BB] text-[#1287BB]"
                          : ""
                      } transition-colors duration-300`}
                      onClick={() => handleCategoryClick(category.name, idx)}
                    >
                      {category.name}
                    </div>
                  ))}
              </div>
              <button
                onClick={handleNextClick}
                className="flex items-center justify-center w-8 h-8 bg-[#1287BB] text-white rounded-full ml-2 mt-5 transition-opacity duration-300 hover:opacity-90"
                disabled={startIndex >= categories.length - visibleCategories}
              >
                <IoChevronForwardOutline />
              </button>
            </div>
            <hr className="my-4 border-b-2 border-gray-300 w-full" />
          </div>
        </div>
        <div className="container mx-auto my-8">
          <div className="flex items-center justify-center flex-wrap gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="w-[350px] bg-gray-200 relative"
                onMouseEnter={() => setSelectedService(service)}
                onMouseLeave={() => setSelectedService(null)}
              >
                {/* {console.log(service)} */}

                {service.picture_1_url && (
                  <img
                    // src={`${apiKey}/${service.picture_1_url}`}
                    src={`http://37.27.82.158:7000${service.picture_1_url}`}
                    alt={"img"}
                    className="w-full h-full rounded-lg object-cover"
                  />
                )}
                {selectedService === service && (
                  <div className="flex flex-col items-center justify-center  cursor-pointer absolute top-0 left-0 bg-black bg-opacity-60 w-full h-full opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-lg p-4 text-center ">
                    <p className="text-white sm-max:text-[14px]">
                      {service.description}
                    </p>
                    <button
                      type="button"
                      className="bg-[#1287BB] p-2 rounded text-white mt-[1.5rem] hover:opacity-80"
                      onClick={() => openModal(service)}
                    >
                      Book Now
                    </button>
                  </div>
                )}
                <p>{service.category_name}</p>
              </div>
            ))}
          </div>
        </div>
        {showFooter && <Footer />}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        service={selectedService}
      />
    </>
  );
};

// Define PropTypes for the component
Morecategory.propTypes = {
  showHeader: PropTypes.bool,
  showSearch: PropTypes.bool,
  showFooter: PropTypes.bool,
};

// Set default props
Morecategory.defaultProps = {
  showHeader: true,
  showSearch: true,
  showFooter: true,
};

export default Morecategory;

import { useState } from "react";
import Modal from "./Modal"

export const Service = ({service})=>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (service) => {
    console.log({service});

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
    return(
      <>
        <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        key={service?.id??0}
        service={service}
      />
         <div
      key={service.id}
      className="w-[350px] bg-gray-200 relative"
     
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
      {service && (
        <div className="flex flex-col items-center justify-center  cursor-pointer absolute top-0 left-0 bg-black bg-opacity-60 w-full h-full opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-lg p-4 text-center ">
          <p className="text-white sm-max:text-[14px]">
            {service.description}
            {/* {service.id} */}
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
      </>
   
    )
}
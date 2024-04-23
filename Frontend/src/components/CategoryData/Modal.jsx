import { useState } from "react";
import BookingFormStep1 from "./BookingFormStep1";
import BookingFormStep2 from "./BookingFormStep2";
import CloseButton from "./CloseButton";

const Modal = ({ isOpen, onClose, service }) => {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    workDetail: "",
  });

  const handleNextStep = (details) => {
    setBookingDetails(details);
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Booking details:", bookingDetails);
    // Close modal after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[1000] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="bg-white rounded-lg w-[450px] relative">
          <CloseButton onClose={onClose} />
          {step === 1 && (
            <BookingFormStep1 service={service} onNext={handleNextStep} />
          )}
          {step === 2 && (
            <BookingFormStep2
              bookingDetails={bookingDetails}
              onSubmit={handleSubmit}
              onPrevious={handlePreviousStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

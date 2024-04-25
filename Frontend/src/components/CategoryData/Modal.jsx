import { useState } from "react";
import BookingFormStep1 from "./BookingFormStep1";
import BookingFormStep2 from "./BookingFormStep2";
import CloseButton from "./CloseButton";

const Modal = ({ isOpen, onClose, service }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    workDetail: "",
  });
  

  const handleNextStep = (details) => {
    setFormData(details);
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      // Send formData to an endpoint
      const response = await fetch("your_endpoint_url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form data submitted successfully:", formData);
        onClose(); // Close modal after successful submission
      } else {
        console.error("Error submitting form data:", response.statusText);
        // Handle error scenario
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      // Handle error scenario
    }
    onClose()
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
            formData={formData}
            onSubmit={handleSubmit}
            onPrevious={handlePreviousStep}
            onInputChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

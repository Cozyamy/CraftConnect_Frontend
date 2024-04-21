import React, { useRef } from "react";

const UploadPicture = ({ onFileChange }) => {
  const fileInputRef = useRef(null);

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
      // Update the src attribute of the img element with the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("profile-picture").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className="w-12 h-12 rounded-full cursor-pointer border-1"
        onClick={handleProfilePictureClick}
      >
        <img
          id="profile-picture"
          src=""
          alt=""
          className="w-full h-full rounded-full"
        />

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          accept="image/*"
        />
      </div>
    </>
  );
};

export default UploadPicture;

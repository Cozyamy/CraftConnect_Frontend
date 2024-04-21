import React, { useRef, useEffect, useState } from "react";

const UploadPicture = ({ onFileChange }) => {
  const fileInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    // Check if profile picture is stored in local storage
    const storedPicture = localStorage.getItem("profilePicture");
    if (storedPicture) {
      setProfilePicture(storedPicture);
    }
  }, []);

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
        const imageData = e.target.result;
        setProfilePicture(imageData);
        // Store profile picture in local storage
        localStorage.setItem("profilePicture", imageData);
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
          src={profilePicture}
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

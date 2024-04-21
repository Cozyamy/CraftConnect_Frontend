import React, { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { FiUpload } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
const categories = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Gardener",
];


const DashPage4 = () => {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({
    id: 1,
    category: "",
    location: "",
    description: "",
    price: "",
    picture: "",
  });
    
  const [editingAd, setEditingAd] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Format the price input with commas
    if (name === "price") {
      const price = parseFloat(value.replace(/,/g, "")) || 0;
      setNewAd({ ...newAd, price: price.toLocaleString() });
    } else {
      setNewAd({ ...newAd, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewAd({ ...newAd, picture: reader.result });
      };   
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newAd.category ||
      !newAd.location ||
      !newAd.description ||
      !newAd.price ||
      !newAd.picture
    ) {
      setError("Please fill in all fields");
      return;
    }

    setError(null);
    if (isEditing) {
      setAds(ads.map((ad) => (ad.id === editingAd.id ? newAd : ad)));
      setNewAd({
        id: ads.length + 1,
        category: "",
        location: "",
        description: "",
        price: "",
        picture: "",
      });
      setEditingAd(null);
      setIsEditing(false);
    } else {
      setAds([...ads, newAd]);
      setNewAd({
        id: ads.length + 1,
        category: "",
        location: "",
        description: "",
        price: "",
        picture: "",
      });
    }
  };

  const handleEditClick = (ad) => {
    setNewAd(ad);
    setEditingAd(ad);
    setIsEditing(true);
  };

  const handleDeleteClick = (adId) => {
    setAds(ads.filter((ad) => ad.id !== adId));
  };

  return (
//    <div className></div>
    <div className="container mx-auto py-8 px-5 rounded-3xl bg-white">
      <h1 className="text-2xl font-semibold mb-4">Post Ads</h1>
      {error && (
        <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Category</label>
            <select
              name="category"
              value={newAd.category}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">Location</label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={newAd.location}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <MdLocationOn className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={newAd.description}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none max-w-screen-sm"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2">Price (₦)</label>
            <div className="relative">
              <input
                type="text"
                name="price"
                value={newAd.price}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <TbCurrencyNaira className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block mb-2">Picture</label>
            <div className="flex items-center">
              <label htmlFor="fileInput" className="cursor-pointer">
                <div className="flex items-center justify-center border border-gray-300 rounded w-24 h-24 cursor-pointer">
                  {newAd.picture ? (
                    <img
                      src={newAd.picture}
                      alt="Ad Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <FiUpload className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#0F6C96] text-white font-semibold px-4 py-2 rounded hover:bg-[#138ec7] focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Your Ads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-gray-100 p-4 rounded">
              <img
                src={ad.picture}
                alt="Ad Preview"
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <p className="text-lg font-semibold mb-2">{ad.category}</p>
              <p className="text-sm text-gray-600 mb-2">{ad.location}</p>
              <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
              <p className="text-sm text-gray-600 mb-2">Price: ₦{ad.price}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEditClick(ad)}
                  className="text-blue-500 hover:text-blue-600 focus:outline-none"
                >
                  <TiPencil className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(ad.id)}
                  className="text-red-500 hover:text-red-600 focus:outline-none"
                >
                  <IoTrashBinOutline className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
          {ads.length < 2 && (
            <div className="bg-gray-200 p-4 rounded flex justify-center items-center ">
              <label htmlFor="fileInput" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center border-2 border-gray-400 border-dashed rounded-md p-8">
                  <BsPlusCircle className="h-10 w-10 text-gray-600" />
                  <span className="text-gray-600">Add Ad</span>
                </div>
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashPage4;

// import React, { useState } from 'react';
// import { BsPlusCircle } from 'react-icons/bs';
// import { IoTrashBinOutline } from 'react-icons/io5';
// import { TiPencil } from 'react-icons/ti';
// import { FiUpload } from 'react-icons/fi';
// import { MdLocationOn } from 'react-icons/md';
// import { TbCurrencyNaira } from 'react-icons/tb'; // Import the Naira icon

// const categories = ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Gardener']; // Add more categories as needed

// const DashPage4 = () => {
//   const [ads, setAds] = useState([]);
//   const [newAd, setNewAd] = useState({
//     id: 1,
//     category: '',
//     location: '',
//     description: '',
//     price: '',
//     picture: '',
//   });
//   const [editingAd, setEditingAd] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAd({ ...newAd, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setNewAd({ ...newAd, picture: reader.result });
//     };
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newAd.category || !newAd.location || !newAd.description || !newAd.price || !newAd.picture) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setError(null); // Clear the error message
//     if (isEditing) {
//       setAds(ads.map(ad => ad.id === editingAd.id ? newAd : ad));
//       setNewAd({
//         id: ads.length + 1,
//         category: '',
//         location: '',
//         description: '',
//         price: '',
//         picture: '',
//       });
//       setEditingAd(null);
//       setIsEditing(false);
//     } else {
//       setAds([...ads, newAd]);
//       setNewAd({
//         id: ads.length + 1,
//         category: '',
//         location: '',
//         description: '',
//         price: '',
//         picture: '',
//       });
//     }
//   };

//   const handleEditClick = (ad) => {
//     setNewAd(ad);
//     setEditingAd(ad);
//     setIsEditing(true);
//   };

//   const handleDeleteClick = (adId) => {
//     setAds(ads.filter(ad => ad.id !== adId));
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-semibold mb-4">Post Ads</h1>
//       {error && <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">{error}</div>}
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2">Category</label>
//             <select
//               name="category"
//               value={newAd.category}
//               onChange={handleInputChange}
//               className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="">Select Category</option>
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block mb-2">Location</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 name="location"
//                 value={newAd.location}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <MdLocationOn className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>
//           <div className="col-span-2">
//             <label className="block mb-2">Description</label>
//             <textarea
//               name="description"
//               value={newAd.description}
//               onChange={handleInputChange}
//               className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             ></textarea>
//           </div>
//           <div>
//             <label className="block mb-2">Price (₦)</label>
//             <div className="relative">
//               <input
//                 type="number"
//                 name="price"
//                 value={newAd.price}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <TbCurrencyNaira className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>
//           <div>
//             <label className="block mb-2">Picture</label>
//             <div className="flex items-center">
//               <label htmlFor="fileInput" className="cursor-pointer">
//                 <div className="flex items-center justify-center border border-gray-300 rounded w-24 h-24 cursor-pointer">
//                   {newAd.picture ? (
//                     <img src={newAd.picture} alt="Ad Preview" className="w-full h-full object-cover rounded" />
//                   ) : (
//                     <FiUpload className="w-8 h-8 text-gray-400" />
//                   )}
//                 </div>
//               </label>
//               <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//             </div>
//           </div>
//         </div>
//         <button type="submit" className="bg-[#0F6C96] text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
//           {isEditing ? 'Update' : 'Submit'}
//         </button>
//       </form>
//       <div className="mt-8">
//         <h2 className="text-lg font-semibold mb-4">Your Ads</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {ads.map(ad => (
//             <div key={ad.id} className="bg-gray-100 p-4 rounded">
//               <img src={ad.picture} alt={ad.category} className="w-full h-48 object-cover mb-4 rounded" />
//               <p className="text-sm text-gray-600 mb-2">{ad.category}</p>
//               <p className="text-sm text-gray-600 mb-2">{ad.location}</p>
//               <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
//               <p className="text-sm text-gray-600 mb-2">Price: ₦{ad.price}</p>
//               <div className="flex justify-between">
//                 <button onClick={() => handleEditClick(ad)} className="text-[#0F6C96] hover:text-blue-600 focus:outline-none">
//                   <TiPencil className="mr-1" /> Edit
//                 </button>
//                 <button onClick={() => handleDeleteClick(ad.id)} className="text-red-500 hover:text-red-600 focus:outline-none">
//                   <IoTrashBinOutline className="mr-1" /> Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//           {ads.length < 2 && (
//             <div className="bg-gray-100 p-4 rounded flex justify-center items-center">
//               <label htmlFor="fileInput" className="cursor-pointer">
//                 <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-8">
//                   <BsPlusCircle className="h-10 w-10 text-gray-400" />
//                   <span className="text-gray-600">Add Ad</span>
//                 </div>
//               </label>
//               <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashPage4;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BsPlusCircle } from 'react-icons/bs';

// const DashPage4 = () => {
//   const [ads, setAds] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [newAd, setNewAd] = useState({
//     category: '',
//     location: '',
//     description: '',
//     price: '',
//     picture: null,
//   });
//   const [editingAd, setEditingAd] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('/api/categories')
//       .then(response => setCategories(response.data))
//       .catch(error => console.error('Error fetching categories:', error));

//     axios.get('/api/ads')
//       .then(response => setAds(response.data))
//       .catch(error => console.error('Error fetching ads:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAd({ ...newAd, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setNewAd({ ...newAd, picture: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newAd.category || !newAd.location || !newAd.description || !newAd.price || !newAd.picture) {
//       setError('Please fill in all fields');
//       return;
//     }

//     // Check if the Artisan already has 2 ads
//     if (ads.length >= 2 && !isEditing) {
//       setError('You can only post a maximum of two ads');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('category', newAd.category);
//     formData.append('location', newAd.location);
//     formData.append('description', newAd.description);
//     formData.append('price', newAd.price);
//     formData.append('picture', newAd.picture);

//     if (isEditing) {
//       axios.put(`/api/ads/${editingAd._id}`, formData)
//         .then(response => {
//           setAds(ads.map(ad => ad._id === editingAd._id ? response.data : ad));
//           toast.success('Ad updated successfully');
//           setNewAd({
//             category: '',
//             location: '',
//             description: '',
//             price: '',
//             picture: null,
//           });
//           setEditingAd(null);
//           setIsEditing(false);
//         })
//         .catch(error => {
//           console.error('Error updating ad:', error);
//           toast.error('Error updating ad. Please try again');
//         });
//     } else {
//       axios.post('/api/ads', formData)
//         .then(response => {
//           setAds([...ads, response.data]);
//           toast.success('Ad posted successfully');
//           setNewAd({
//             category: '',
//             location: '',
//             description: '',
//             price: '',
//             picture: null,
//           });
//         })
//         .catch(error => {
//           console.error('Error posting ad:', error);
//           toast.error('Error posting ad. Please try again');
//         });
//     }
//   };

//   const handleEditClick = (ad) => {
//     setNewAd({
//       category: ad.category,
//       location: ad.location,
//       description: ad.description,
//       price: ad.price,
//       picture: null,
//     });
//     setEditingAd(ad);
//     setIsEditing(true);
//   };

//   const handleDeleteClick = (adId) => {
//     axios.delete(`/api/ads/${adId}`)
//       .then(() => {
//         setAds(ads.filter(ad => ad._id !== adId));
//         toast.success('Ad deleted successfully');
//       })
//       .catch(error => {
//         console.error('Error deleting ad:', error);
//         toast.error('Error deleting ad. Please try again');
//       });
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-semibold mb-4">Post Ads</h1>
//       {error && <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">{error}</div>}
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         {/* Rest of the form */}
//         <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
//           {isEditing ? 'Update' : 'Submit'}
//         </button>
//       </form>
//       <div className="mt-8">
//         <h2 className="text-lg font-semibold mb-4">Your Ads</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {Array.isArray(ads) && ads.map(ad => (
//             <div key={ad._id} className="bg-gray-100 p-4 rounded">
//               <img src={ad.picture} alt={ad.category} className="w-full h-48 object-cover mb-4 rounded" />
//               <p className="text-sm text-gray-600 mb-2">{ad.category}</p>
//               <p className="text-sm text-gray-600 mb-2">{ad.location}</p>
//               <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
//               <p className="text-sm text-gray-600 mb-2">Price: ${ad.price}</p>
//               <div className="flex justify-between">
//                 <button onClick={() => handleEditClick(ad)} className="text-blue-500 hover:text-blue-600 focus:outline-none">
//                   Edit
//                 </button>
//                 <button onClick={() => handleDeleteClick(ad._id)} className="text-red-500 hover:text-red-600 focus:outline-none">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//           {ads.length < 2 && (
//             <div className="bg-gray-100 p-4 rounded flex justify-center items-center">
//               <label htmlFor="fileInput" className="cursor-pointer">
//                 <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-8">
//                   <BsPlusCircle className="h-10 w-10 text-gray-400" />
//                   <span className="text-gray-600">Add Ad</span>
//                 </div>
//               </label>
//               <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//             </div>
//           )}
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </div>
//   );
// };

// export default DashPage4;

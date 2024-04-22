import React, { useState, useEffect } from "react";
import { postService, getCategories } from "../../../authentication/Api";
import { FiUpload } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import Cookies from "js-cookie";

export const CreateAdsForm = ({ close }) => {
  const [newAd, setNewAd] = useState({
    category: "",
    location: "",
    description: "",
    price: "",
    picture_1: "",
  });
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState();
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setCategoriesLoading(true);
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAd({ ...newAd, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewAd({ ...newAd, picture_1_url: reader.result, picture_1: file });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ newAd });
      const formData = new FormData();
      formData.append("category_id", newAd.category_id);
      formData.append("location", newAd.location);
      formData.append("description", newAd.description);
      formData.append("price", newAd.price);
      formData.append("picture_1", newAd.picture_1);

      const token = Cookies.get("token");
      try {
        const response = await postService(token, formData);
      } catch (error) {
        setError("Failed to create from api");
      }
      setNewAd({
        category: "",
        location: "",
        description: "",
        price: "",
        picture: "",
      });
      setError(null);
      close();
    } catch (error) {
      setError("Failed to create ad");
      console.error("Error creating ad:", error);
    }
  };

  return (
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
              name="category_id"
              value={newAd.category_id}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
            >
              <option value="">Select Category</option>
              {!categoriesLoading &&
                categories?.categories?.map((category, index) => (
                  <option
                    key={index}
                    className="capitalize"
                    value={category.id}
                  >
                    {category.name}
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
                  {newAd.picture_1_url ? (
                    <img
                      src={newAd.picture_1_url}
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
                name="picture_1"
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
          Submit
        </button>
      </form>
    </div>
  );
};

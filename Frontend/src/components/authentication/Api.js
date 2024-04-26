import axios from "axios";
import Cookies from "js-cookie";

export const apiKey = "http://37.27.82.158:7000/api/v1/"

export const baseUrl =  "http://37.27.82.158:7000"

export const  loginWithServer = async (token)=>{
    const res = await axios.post(`${apiKey}login`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res;
}

export const  getUserFromServer = async (token)=>{
  const res = await axios.get(`${apiKey}user/me`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return res;
}


export const  postService = async (token,formData)=>{
  const res = await axios.post(`${apiKey}create_service`,formData,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return res;
}


export const  getCategories = async ()=>{
  const res = await axios.get(`${apiKey}categories`,{
  });
return res;
}

export const getUserServices = async () => {
  const token = Cookies.get('token')
  const res = await axios.get(`${apiKey}user/services/`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return res;
}

export const  getServices = async (category)=>{
  const res = await axios.get(`${apiKey}service`,{
  });

return res;
}


export const getUserOrders = async () => {
  const token = Cookies.get('token')
  const res = await axios.get(`${apiKey}user_orders`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return res;
}

export const getArtisanOrders = async () => {
  const token = Cookies.get('token')
  const res = await axios.get(`${apiKey}artisan_orders`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return res;
}


export const createBooking = async (formData) => {
  const token = Cookies.get('token')
  const res = await axios.post(`${apiKey}create_booking/1`, formData,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return res;
}

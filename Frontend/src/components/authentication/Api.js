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
  const res = await axios.post(`${apiKey}create_booking/${service.id}`, formData,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return res;
}


export const deleteService = async () => {
  const token = Cookies.post('token')
  const res = await axios.delete(`${apiKey}create_booking/1`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return res;
}


export const registerInServer = async (token, first_name, last_name, phone_number) => {
        const res = await axios.post(
          `${apiKey}register`,
          {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
return res;
}


      // Get ID token
      // const token = await credential.user.getIdToken();
      // console.log(token);
      // // Email verification
      // await sendEmailVerification(credential.user);

      // // Checking if email is verified
      // if (!credential.user.emailVerified) {
      //   setErrorMessage("Please verify your email address before logging in.");
      //   setIsLoading(false);
      //   // return;
      // }

      // try {
      //   // Send token to serve
      //   const res = await axios.post(
      //     `${apiKey}register`,
      //     {
      //       first_name: first_name,
      //       last_name: last_name,
      //       phone_number: phone_number,
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );

      //   console.log(res.data);
      // } catch (error) {
      //   console.log("Error sending token to server:", error.message);
      // }

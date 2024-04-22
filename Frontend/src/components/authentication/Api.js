import axios from "axios";

export const apiKey = "http://37.27.82.158:7000/api/v1/"


export const  loginWithServer = async (token)=>{
    const res = await axios.post(`${apiKey}login`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res;
}

export const  getUserFromServer = async (token)=>{
  const res = await axios.get(`${apiKey}user/name`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return res;
}
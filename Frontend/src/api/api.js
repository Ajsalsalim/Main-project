import axios from "axios"

const API = axios.create({baseURL: process.env.REACT_APP_API_SERVER_URL})

API.interceptors.request.use((config) => {
    const usertype = localStorage.getItem("usertype")
    if(usertype){
      const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      config.headers['x-access-token'] = token;
    }

    }else{
      const token = localStorage.getItem('admintoken');
      if (token) {
        config.headers['x-access-token'] = token;
      }
    }
    

    return config;
  }); 


export const signInGoogle = (accessToken,userType) => API.post("/login", {
    googleAccessToken: accessToken,
    userType:userType
})


export const signUpGoogle = (accessToken,userType) => API.post("/signup", {
    googleAccessToken: accessToken,
    userType:userType
})

export default API
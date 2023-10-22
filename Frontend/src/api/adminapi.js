import axios from "axios"

const ADMINAPI = axios.create({baseURL: process.env.REACT_APP_API_SERVER_URL})

ADMINAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('admintoken');
    console.log(token);
    if (token) {
      config.headers['x-access-token'] = token;
    }

    return config;
  }); 
  export default ADMINAPI
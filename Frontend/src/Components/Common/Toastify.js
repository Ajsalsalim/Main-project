import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Toastify = () => {

    toast.error("token expired!,please login", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });



  return (
    <div>
    <ToastContainer/>
      
    </div>
  )
}

export default Toastify

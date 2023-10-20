
import * as api from "../../api/api"
import {googleauth} from "./AuthSlice"



export const signinGoogle = (accessToken, navigate,userType) => async (dispatch)=>{
    try{
        // login user
        const {data} = await api.signInGoogle(accessToken,userType)
             console.log(data)
        dispatch(googleauth(data))
         if(data.message==="User doesn't exist!"||data.message==="Worker doesn't exist!"||data.message==="customer is blocked by admin"||data.message==="worker is blocked by admin"){
            navigate("/login")
       }
       else{
        if(userType==="customer"){
            navigate("/user/home")
        }else{
            navigate("/worker/home")
        }

       }
    
    }catch(err){
        console.log(err)
    }
}

export const signupGoogle = (accessToken, navigate,userType) => async (dispatch)=>{
    try{
        // signup user
        console.log(userType);

        const {data} = await api.signUpGoogle(accessToken,userType)
        console.log(data);

        dispatch(googleauth(data))
        console.log(data.message);
        if(data.message==="User already exist!"||data.message==="Worker already exist!"){
            navigate("/signup")
        }
        
      else{

        if(userType==="customer"){
            navigate("/user/home")
        }else if(userType==="worker"){
            navigate("/worker/home")
        }
    }
    }catch(err){
        console.log(err)
    }
}
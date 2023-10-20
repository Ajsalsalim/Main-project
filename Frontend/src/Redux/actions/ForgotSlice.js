import {createSlice} from "@reduxjs/toolkit";
const initialState={
    email:"",
    usertype:""


}

const forgotSlice =createSlice({
    name:"forgot",
    initialState,
    reducers:{
        updatecredentials(state,action){
            const {email,usertype}=action.payload
            console.log(usertype);
            console.log(email);
            state.email=email;
            state.usertype=usertype;

        }





    }
  







})
export const {updatecredentials}=forgotSlice.actions
export default forgotSlice.reducer
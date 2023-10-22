import {createSlice} from "@reduxjs/toolkit"


const adminauthSlice=createSlice({
    name:"adminauth",
    initialState:{
        token: localStorage.getItem("admintoken")|| null,
        isAuthenticated:localStorage.getItem("admintoken")?true:false,
        message:null
    },
    reducers:{
        login(state,action){
            const {token}=action.payload
            console.log(token);
            localStorage.setItem("admintoken",token);
            state.token= token;
            state.isAuthenticated=true;

        },
        logout(state){
            localStorage.removeItem("admintoken");
            state.token=null
            state.isAuthenticated=false;

        }

    }



})



export const {login,logout}= adminauthSlice.actions;
export default adminauthSlice.reducer;

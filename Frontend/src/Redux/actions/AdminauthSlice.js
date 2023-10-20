import {createSlice} from "@reduxjs/toolkit"


const adminauthSlice=createSlice({
    name:"adminauth",
    initialState:{
        token: localStorage.getItem("token")|| null,
        isAuthenticated:localStorage.getItem("token")?true:false,
        message:null
    },
    reducers:{
        login(state,action){
            const {token}=action.payload
            console.log(token);
            localStorage.setItem("token",token);
            state.token= token;
            state.isAuthenticated=true;

        },
        logout(state){
            localStorage.removeItem("token");
            state.token=null
            state.isAuthenticated=false;

        }

    }



})



export const {login,logout}= adminauthSlice.actions;
export default adminauthSlice.reducer;

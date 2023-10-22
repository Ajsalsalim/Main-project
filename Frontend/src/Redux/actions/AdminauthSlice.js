import {createSlice} from "@reduxjs/toolkit"


const adminauthSlice=createSlice({
    name:"adminauth",
    initialState:{
        token: localStorage.getItem("token")|| null,
        adminid: localStorage.getItem("adminid")|null,
        isAuthenticated:localStorage.getItem("token")?true:false,
        message:null
    },
    reducers:{
        login(state,action){
            const {token,adminid}=action.payload
            console.log(token);
            localStorage.setItem("token",token);
            localStorage.setItem("adminid",adminid)
            state.token= token;
            state.adminid=adminid
            state.isAuthenticated=true;

        },
        logout(state){
            localStorage.removeItem("token");
            localStorage.removeItem("adminid")
            state.token=null
            state.adminid=null
            state.isAuthenticated=false;

        }

    }



})



export const {login,logout}= adminauthSlice.actions;
export default adminauthSlice.reducer;

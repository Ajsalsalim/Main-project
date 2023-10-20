import {createSlice} from "@reduxjs/toolkit";

const authSlice= createSlice({
    name:"auth",
    initialState:{
        token: localStorage.getItem("token")|| null,
        isAuthenticated:localStorage.getItem("token")?true:false,
        userType:localStorage.getItem("userType")|| null,
        message:null,
        id:localStorage.getItem("id")||null
        
    },
    reducers:{
        loginSuccess(state,action){
            const {token,userType,id} = action.payload;
            localStorage.setItem("token",token);
            localStorage.setItem("userType",userType);
            localStorage.setItem("id",id);
            state.token= token;
            state.userType=userType;
            state.id=id
            
        },
        logout(state){
            localStorage.removeItem("token");
            localStorage.removeItem("userType")
            localStorage.removeItem("id")

        },
        googleauth(state,action){
            console.log(action.payload);
            const {token,userType,message,id}=action.payload
            localStorage.setItem("token",token);
            localStorage.setItem("userType",userType);
            localStorage.setItem("id",id);
            state.token= token;
            state.userType=userType;
            state.message=message;
            state.id=id;
        },
        removemessage(state){
            state.message=null
        }
       
        
    },

});
export const {loginSuccess,logout,googleauth,removemessage}= authSlice.actions;
export default authSlice.reducer;
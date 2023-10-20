import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./actions/AuthSlice"
import forgotReducer from "./actions/ForgotSlice"
import adminauthReducer from"./actions/AdminauthSlice"
import loadingSlice from "./actions/LoadingSlice";
import Searchresults from "./actions/Searchresults";


export const store= configureStore({
    reducer:{
        auth: authReducer,
        forgot: forgotReducer,
        adminauth: adminauthReducer,
        loading:loadingSlice,
        search:Searchresults
        
        
    }
});



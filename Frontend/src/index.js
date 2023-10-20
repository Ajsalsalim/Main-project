import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import {store} from "./Redux/Store"
import {Provider} from "react-redux";



import thunk from "redux-thunk"
import './index.css';
import App from './App';
import {GoogleOAuthProvider} from "@react-oauth/google"

const clientId=process.env.REACT_APP_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
      <App/>
     </GoogleOAuthProvider>
    </Provider>
   </BrowserRouter>
 
);




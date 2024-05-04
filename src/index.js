import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "./style/scss/main.scss";
import store from "./redux/app/store";
import {
  SetPrivateAxiosRequest,
  SetPrivateAxiosResponse,
} from "./config/axiosInterceptor";
import HotelCard from "./components/tera/HotelCard";
import AuthProvider from "./context/AuthProvider";




SetPrivateAxiosRequest();
SetPrivateAxiosResponse();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
reportWebVitals();

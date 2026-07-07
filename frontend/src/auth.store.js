import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice/auth.slice";
import queryReducer from "./features/pages/query.slice";

const store = configureStore({
  reducer: {
   auth: authReducer, 
   query: queryReducer  

  }
});

export default store;








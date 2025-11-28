import {  configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import  userReducer  from "./slices/userSlice";
import popupReducer from "./slices/popUpSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
      book: bookReducer,
       popup: popupReducer,
        user: userReducer,
        borrow: borrowReducer,
    },
});


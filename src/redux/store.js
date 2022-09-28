import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartslice"
export default configureStore({
    reducer:{
        cart: cartReducer,
    },
})
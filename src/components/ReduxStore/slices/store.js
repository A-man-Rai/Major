import {configureStore} from "@reduxjs/toolkit";
import RegisterSlice from "./RegisterSlice.js";
import UserSlice from "./UserSlice.js";
import FormSlice from "./FormSlice.js";
import ValidUserSlice from "./ValidUserSlice.js";
import authSlice from "./authSlice.js";
const store=configureStore({
    reducer:{
        register:RegisterSlice,
        user:UserSlice,
        form:FormSlice,
        validUser:ValidUserSlice,
        auth:authSlice
    }
})

export default store;
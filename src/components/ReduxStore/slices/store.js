import {configureStore} from "@reduxjs/toolkit";
import RegisterSlice from "./RegisterSlice.js";
import UserSlice from "./UserSlice.js";
import FormSlice from "./FormSlice.js";
import ValidUserSlice from "./ValidUserSlice.js";
const store=configureStore({
    reducer:{
        register:RegisterSlice,
        user:UserSlice,
        form:FormSlice,
        validUser:ValidUserSlice
    }
})

export default store;
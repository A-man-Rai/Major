import { createSlice } from "@reduxjs/toolkit";


const authSlice= createSlice({
    name: "auth",
    initialState: {
            validUser:false,
            isLinked:false,
            otp:false,
            newpassword:false,
            isAdmin:false
    },
    reducers: {
        setValidUser(state, action) {
            state.validUser= action.payload; 
        }, 
        setIsLinked(state,action){
            state.isLinked=action.payload
        },
        setOtp(state,action){
            state.otp=action.payload
        },
        setPassword(state,action){
          state.newpassword=action.payload
        },
        setAdmin(state,action){
            state.isAdmin=action.payload;
         }
    },
});


export const {setValidUser,setIsLinked,setOtp,setPassword,setAdmin} = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


const authSlice= createSlice({
    name: "auth",
    initialState: {
            isLinked:false,
            otp:false,
            newpassword:false,
    },
    reducers: {
        setIsLinked(state,action){
            state.isLinked=action.payload
        },
        setOtp(state,action){
            state.otp=action.payload
        },
        setPassword(state,action){
          state.newpassword=action.payload
        }
    },
});


export const {setIsLinked,setOtp,setPassword} = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const validUserSlice= createSlice({
    name: "validUser",
    initialState: {
            userId:"",
            appliedForPermit:false,
            token:"",
            sessionEnded:false,
    },
    reducers: {
        setUserId(state, action) {
            state.userId= action.payload; 
        },
        setAppliedForPermit(state, action) {
            state.appliedForPermit= action.payload; 
        },
        setToken(state,action){
            state.token= action.payload; 
        },
        setSession(state,action){
            state.sessionEnded=action.payload
        }
    },
});


export const {setUserId,setAppliedForPermit,setToken,setSession} = validUserSlice.actions;
export default validUserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const validUserSlice= createSlice({
    name: "validUser",
    initialState: {
            userId:"",
            appliedForPermit:false,
    },
    reducers: {
        setUserId(state, action) {
            state.userId= action.payload; 
        },
        setAppliedForPermit(state, action) {
            state.appliedForPermit= action.payload; 
        },
    },
});


export const {setUserId,setAppliedForPermit} = validUserSlice.actions;
export default validUserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const registerSlice= createSlice({
    name: "register",
    initialState: {
            email: ' ',
            firstname:" ",
            surname:" ",
            password:" ",
            nationality:" ",
    },
    reducers: {
        setFirstname(state, action) {
            state.firstname= action.payload; 
        },
        setEmail(state, action) {
            state.email = action.payload; 
        },
        setSurname(state, action) {
            state.surname= action.payload; 
        },
        setPassword(state, action) {
            state.password= action.payload; 
        },
        setNationality(state,action){
          state.nationality=action.payload;
        }
    },
});


export const {setEmail,setFirstname,setSurname,setPassword,setNationality } = registerSlice.actions;
export default registerSlice.reducer;

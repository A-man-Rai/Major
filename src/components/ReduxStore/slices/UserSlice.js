import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name: "user",
    initialState: {
            forgotPassword:false,
            accountCreated:false,
            confirmationError:false,
            invalidEmail:false,
            passwordChanged:false,
    },
    reducers: {
        setForgotPassword(state, action) {
            state.forgotPassword= action.payload; 
        },
        setAccountCreated(state,action){
           state.accountCreated=action.payload;
        },
        setConfirmationError(state,action){
            state.confirmationError=action.payload;
        },
        setInvalidEmail(state,action){
           state.invalidEmail=action.payload;
        },
        setPassowordChanged(state,action){
           state.passwordChanged=action.payload;
        },
      
    },
});


export const {setForgotPassword,setAccountCreated,setConfirmationError,setInvalidEmail,setPassowordChanged} = userSlice.actions;
export default userSlice.reducer;

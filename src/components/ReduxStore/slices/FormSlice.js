import { createSlice } from "@reduxjs/toolkit";

const formSlice=createSlice({
   name:"form",
   initialState: {
    name: "",
    dob: '',
    occupation: "",
    nationality: "",
    passportNo: "",
    dateOfIssue: "",
    validUpTo:"",
    ilpNo: "",
    visaNo: "",
    visaIssue: "",
    visaValidUpto: "",
    residentialAddress: "",
    dateOfVisit: "",
    durationOfStay: "",
    travelArrangement: "",
    passphoto:null,
    signaturePhoto:null,
    visaPhoto:null,
    passportPhoto:null,
   },
   reducers:{
    setName(state, action) {
        state.name= action.payload; 
    },
    setDob(state, action) {
        state.dob= action.payload; 
    },
    setOccupation(state, action) {
        state.occupation= action.payload; 
    },
    setNationality(state, action) {
        state.nationality= action.payload; 
    },
    setPassportNo(state, action) {
        state.passportNo= action.payload; 
    },
    setDateOfIssue(state, action) {
        state.dateOfIssue= action.payload; 
    },
    setValidUpTo(state, action) {
        state.validUpTo= action.payload; 
    },
    setIlpNo(state, action) {
        state.ilpNo= action.payload; 
    },
    setVisaNo(state, action) {
        state.visaNo= action.payload; 
    },
    setVisaIssue(state, action) {
        state.visaIssue= action.payload; 
    },
    setVisaValidUpto(state, action) {
        state.visaValidUpto= action.payload; 
    },
    setResidentakAddress(state, action) {
        state.residentialAddress= action.payload; 
    },
    setDateOfVisit(state, action) {
        state.dateOfVisit= action.payload; 
    },
    setDurationOfStay(state, action) {
        state.durationOfStay= action.payload; 
    },
    setTravelArrangement(state, action) {
        state.travelArrangement= action.payload; 
    },
    setPassphoto(state, action) {
        state.passphoto= action.payload; 
    },
    setSignaturePhoto(state, action) {
        state.signaturePhoto= action.payload; 
    },
    setVisaPhoto(state, action) {
        state.visaPhoto= action.payload; 
    },
    setPassportPhoto(state, action) {
        state.passportPhoto= action.payload; 
    },
   },

});

export const {setName,setDob,setOccupation,setNationality,setPassportNo,setDateOfIssue,
    setValidUpTo,setIlpNo,setVisaNo,setVisaIssue,setVisaValidUpto,setResidentakAddress,
    setDateOfVisit,setDurationOfStay,setTravelArrangement,setPassphoto,setSignaturePhoto,
    setVisaPhoto,setPassportPhoto,} = formSlice.actions;
export default formSlice.reducer;
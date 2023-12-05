import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: "",
    isLoggedIn: false,
    name: "",
    email: "",
    image: null,
    latitude: null,
    longitude: null,
};
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setState: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = true;
            state.image = action.payload.image || null;
            state.type = action.payload.type;
            state.mobileNumber = action.payload.mobileNum;
            state.city = action.payload.city;
            state.pincode = action.payload.pincode;
            state.gender = action.payload.gender;
            state.state = action.payload.state;
            state.latitude = 78.0001;
            state.longitude = 80.0001;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setLocation: (state, action) => {
            state.latitude = 78.0001;
            // state.latitude = action.payload.latitude;
            state.longitude = 80.0001;
            // state.longitude = action.payload.longitude;
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

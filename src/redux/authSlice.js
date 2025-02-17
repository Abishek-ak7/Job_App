import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user  : null,
    loading : false,
    error :null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginRequest :(state) =>{
            state.loading = true;
            state.error = null;
        },
        loginSuccess:(state,action)=>{
            state.user = action.payload;
            state.loading = false;
        },
        loginFailure : (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        registerRequest : (state) =>{
            state.loading = true;
            state.error = null;
        },
        registerSuccess : (state,action)=>{
            state.user = action.payload;
            state.loading = false;
        },
        registerFailure :(state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },logout:(state)=>{
            state.user = null;
        },
    },
});

export const{
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login =createAsyncThunk('auth/login',async(credentials,{rejectWithValue})=>{
    try {
        const response = await axios.post('https://dummyjson.com/auth/login',credentials)
        return response.data
        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
const authSlice =createSlice({
    name:'auth',
    initialState:{
        user:null,
        error:null,
        loading:false,
    },
    reducers:{
        logout(state){
            state.user=null
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=null
            state.user = action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=null
            state.error = action.payload
        })
    }
})

export const {logout}=authSlice.actions
export default authSlice.reducer
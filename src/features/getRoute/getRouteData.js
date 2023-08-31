import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "http://139.28.37.204/api/routes";

export const getRouteGeneralInfo = createAsyncThunk("generalRoute/getRouteGeneralInfo", async () => {
     const response = await axios.get(`${BASE_URL}/get_unique_routes`, {
          
     })
     // console.log(response.data);
 
     return response.data
})

export const getRouteFamillyInfo = createAsyncThunk("generalRoute/getRouteFamillyInfo", async ({move_from, move_to}) => {
     const response = await axios.get(`${BASE_URL}/get_routes_family?move_from_city=${move_from}&move_to_city=${move_to}`, {
          
     })
     // console.log(response.data);
 
     return response.data
})
 
const routeLogic = createSlice({
     name: "generalRoute",
     initialState: {
        routes: [],
        familly_routes: []
     },
     reducers: {},
     extraReducers : (builder) => {
          builder
               .addCase(getRouteGeneralInfo.pending, (state) => {
                    //console.log("?");
               })
               .addCase(getRouteGeneralInfo.fulfilled, (state, action) => {
                    //console.log("+");
                    //console.log(action.payload);
                    state.routes = [...action.payload];
               })
               .addCase(getRouteGeneralInfo.rejected, (state, action) => {
                    //console.log("-");
               })
               .addCase(getRouteFamillyInfo.pending, (state) => {
                    //console.log("?");
               })
               .addCase(getRouteFamillyInfo.fulfilled, (state, action) => {
                    //console.log("+");
                    //console.log(action.payload);
                    state.familly_routes = [...action.payload]
               })
               .addCase(getRouteFamillyInfo.rejected, (state, action) => {
                    //console.log("-");
               })
     }
})

export const {} = routeLogic.actions;
export default routeLogic.reducer;
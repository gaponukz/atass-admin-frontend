import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const getRouteGeneralInfo = createAsyncThunk("generalRoute/getRouteGeneralInfo", async () => {
     const response = await axios.get(`${BASE_URL}/get_unique_routes`, {
          
     })
     // console.log(response.data);
 
     return response.data
})

const routeLogic = createSlice({
     name: "generalRoute",
     initialState: {
        routes: []
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
     }
})

export const {} = routeLogic.actions;
export default routeLogic.reducer;
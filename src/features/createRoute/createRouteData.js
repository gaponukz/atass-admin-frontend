import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

const createRouteLogic = createSlice({
     name: "postRoute",
     initialState: {
          steps: {
               firstStep: true,
               secondStep: false,
               thirdStep: false,
               fourthStep: false,
          },
          new_route: {
               "route_prototype": {
                    "move_from": {
                         "place": {
                              "country": "",
                              "city": "",
                              "street": "",
                              "mar_url": "",
                         },
                         "id": nanoid(),
                    },
                    "move_to": {
                         "place": {
                              "country": "",
                              "city": "",
                              "street": "",
                              "mar_url": "",
                         },
                         "from_start": 0,
                         "id": nanoid(),
                    },
                    "sub_spots": [],
                    "passengers_number": 0,
                    "description": {
                         "ua": "",
                         "en": "",
                         "pl": ""
                    },
                    "rules": {
                         "ua": "",
                         "en": "",
                         "pl": ""
                    },
                    "transportation_rules": {
                         "ua": "",
                         "en": "",
                         "pl": ""
                    },
                    "is_active": true,
                    "prices": {}
               },
               "departure_dates": []
          },

          test: "tetetete"
     },
     reducers: {
          createRoute1: {
               reducer(state, action) {
                   //console.log("here2 -> ", action.payload);
                   state.new_route["route_prototype"]["move_from"] = {
                       "place": {
                           "country": action.payload.fromCountry,
                           "city": action.payload.fromCity,
                           "street": action.payload.fromStreet,
                           "map_url": action.payload.map1,
                       },
                       "id": nanoid()
                   }
   
                   state.new_route["route_prototype"]["move_to"] = {
                       "place": {
                           "country": action.payload.toCountry,
                           "city": action.payload.toCity,
                           "street": action.payload.toStreet,
                           "map_url": action.payload.map2,
                       },
                       "id": nanoid()
                   }
   
                   state.new_route["route_prototype"]["passengers_number"] = action.payload.numberPlaces
               },
               prepare(fromCountry, fromCity, fromStreet, toCountry, toCity, toStreet, numberPlaces, map1, map2) {
                   return {
                       payload: {
                           fromCountry, fromCity, fromStreet, toCountry, toCity, toStreet, numberPlaces, map1, map2
                       }
   
                   }
               }
           },
          change2: (state) => {
               state.steps.secondStep = true;
          },
          change3: (state) => {
               state.steps.thirdStep = true;
          },
          change4: (state) => {
               state.steps.fourthStep = true;
          },
          addArrayDatetime: {
               reducer(state, action) {
                   state.new_route.departure_dates.push(action.payload[0])
                   
               },
               prepare(date1, date2) {
                   return {
                       payload: [
                           date1,
                           date2
                       ]
   
                   }
               }
           }
     },
     extraReducers: (builder) => {

     }
})

export const { change2, change3, change4, addArrayDatetime, createRoute1 } = createRouteLogic.actions;
export default createRouteLogic.reducer;
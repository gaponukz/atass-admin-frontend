import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

const BASE_URL = "http://139.28.37.204/api/routes";

export const postNewRoute = createAsyncThunk("postRoute/postNewRoute", async ({ new_route }) => {
     console.log(new_route);
     const response = axios.post(`${BASE_URL}/add_routes`, {
          headers: {
               "Content-Type": "application/json",
          },
          route_prototype: new_route.route_prototype,
          departure_dates: new_route.departure_dates
     })
})

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
          prices: {},
          submit_price: false,

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
          createRoute2: {
               reducer(state, action) {
                    //console.log("here2 !", action.payload);
                    state.new_route["route_prototype"]["description"] = {
                         "en": action.payload.cmt12,
                         "pl": action.payload.cmt13,
                         "ua": action.payload.cmt11
                    }
                    state.new_route["route_prototype"]["rules"] = {
                         "en": action.payload.cmt22,
                         "pl": action.payload.cmt23,
                         "ua": action.payload.cmt21
                    }
                    state.new_route["route_prototype"]["transportation_rules"] = {
                         "en": action.payload.cmt32,
                         "pl": action.payload.cmt33,
                         "ua": action.payload.cmt31
                    }

               },
               prepare(cmt11, cmt12, cmt13, cmt21, cmt22, cmt23, cmt31, cmt32, cmt33) {
                    return {
                         payload: { cmt11, cmt12, cmt13, cmt21, cmt22, cmt23, cmt31, cmt32, cmt33 }
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
          },
          deleteArrayDatetime: (state, action) => {
               // console.log("cancel", action.payload);
               state.new_route.departure_dates = state.new_route.departure_dates.slice(0, action.payload).concat(
                    state.new_route.departure_dates.slice(action.payload + 1)
               )
          },
          editSubRoute: (state, action) => {
               //console.log("Edit");
               //console.log(action.payload);
               let [objE, indexE] = action.payload;
               state.new_route.route_prototype.sub_spots[indexE] = {...objE};
          },
          deleteSubRoute: (state, action) => {
               // console.log(action.payload);
               state.new_route.route_prototype.sub_spots = state.new_route.route_prototype.sub_spots.slice(0, action.payload).concat(
                    state.new_route.route_prototype.sub_spots.slice(action.payload + 1)
               )
          },
          addSubSpot: {
               reducer(state, action) {
                    state.new_route.route_prototype.sub_spots.push(action.payload)
               },
               prepare(country, city, street, map, time) {

                    // if (time[0] === " ") {
                    //      time = time.trimStart();
                    // }
                    return {
                         payload: {
                              "place": {
                                   "country": country,
                                   "city": city,
                                   "street": street,
                                   "map_url": map,
                              },
                              "from_start": time,
                              "id": String(nanoid())
                         }
                    }
               }
          },
          submitPrices: {
               reducer(state, action) {
                   state.new_route["route_prototype"]["prices"] = {...action.payload.prices};
                   state.submit_price = true;

                   // state.new_route["route_prototype"]["sub_spots"] = {...action.payload.subspots};    
               },  
               prepare(prices, sub_spots) {
                   return {
                       payload: {
                           "prices": prices,
                           "subspots": sub_spots
                       }
                   }
               }
          },
     },
     extraReducers: (builder) => {
          builder
               .addCase(postNewRoute.pending, (state) => {
                    console.log("?");
               })
               .addCase(postNewRoute.fulfilled, (state, action) => {
                    console.log("+");
                    state.new_route = {
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
                    }

                    state.steps = {
                         firstStep: true,
                         secondStep: false,
                         thirdStep: false,
                         fourthStep: false,
                    }

                    state.prices = {}
               })
               .addCase(postNewRoute.rejected, (state, action) => {
                    console.log("-");
               })
     }
})

export const { change2, change3, change4, addArrayDatetime, deleteArrayDatetime, deleteSubRoute, submitPrices, addSubSpot, createRoute1, createRoute2, editSubRoute } = createRouteLogic.actions;
export default createRouteLogic.reducer;
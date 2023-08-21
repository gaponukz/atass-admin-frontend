import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "http://localhost:8000";

const editRoute = createSlice({
     name: "editRoute",
     initialState: {
          route_to_change: {},

          test: "test message"
     },
     reducers: {
          setRoute: (state, action) => {
               //console.log(action.payload);
               state.route_to_change = {...action.payload}
          },
          onChangeValue: {
               reducer(state, action) {
                   switch (action.payload[1]) {
                       case "from_country":
                           state.route_to_change.move_from.place.country = action.payload[0];
                           break
   
                       case "from_city":
                           state.route_to_change.move_from.place.city = action.payload[0];
                           break
                       
                       case "from_street":
                           state.route_to_change.move_from.place.street = action.payload[0];
                           break
                       
                       case "from_map_url":
                           state.route_to_change.move_from.place.map_url = action.payload[0];
                           break
   
                       case "to_country":
                           state.route_to_change.move_to.place.country = action.payload[0];
                           break
   
                       case "to_city":
                           state.route_to_change.move_to.place.city = action.payload[0];
                           break
                       
                       case "to_street":
                           state.route_to_change.move_to.place.street = action.payload[0];
                           break
                       
                       case "to_map_url":
                           state.route_to_change.move_to.place.map_url = action.payload[0];
                           break
                       
                       case "descip_ua":
                           state.route_to_change.description.ua = action.payload[0];
                           break
                       
                       case "descip_en":
                           state.route_to_change.description.en = action.payload[0];
                           break
   
                       case "descip_pl":
                           state.route_to_change.description.pl = action.payload[0];
                           break
   
                       case "rules_ua":
                           state.route_to_change.rules.ua = action.payload[0];
                           break
                       
                       case "rules_en":
                           state.route_to_change.rules.en = action.payload[0];
                           break
   
                       case "rules_pl":
                           state.route_to_change.rules.pl = action.payload[0];
                           break
   
                       case "trans_ua":
                           state.route_to_change.transportation_rules.ua = action.payload[0];
                           break
                       
                       case "trans_en":
                           state.route_to_change.transportation_rules.en = action.payload[0];
                           break
   
                       case "trans_pl":
                           state.route_to_change.transportation_rules.pl = action.payload[0];
                           
                           break
   
                       case "sub_spot":
                           //console.log("tyt", action.payload[0], action.payload[1])
                           //console.log(action.payload[0].at(-1));
                           //console.log("here");
   
                           state.route_to_change.sub_spots[action.payload[0].at(-1)].place.country = action.payload[0].at(0);
                           state.route_to_change.sub_spots[action.payload[0].at(-1)].place.city = action.payload[0].at(1);
                           state.route_to_change.sub_spots[action.payload[0].at(-1)].place.street = action.payload[0].at(2);
                           state.route_to_change.sub_spots[action.payload[0].at(-1)].place.map_url = action.payload[0].at(3);
                           state.route_to_change.sub_spots[action.payload[0].at(-1)].is_active = action.payload[0].at(4);
                           break
   
                       case "change_price":
                           console.log("here", action.payload[0]);
                           let id1 = action.payload[0].at(0);
                           let id2 = action.payload[0].at(1);
                           let price = action.payload[0].at(2);
                           state.route_to_change.prices[id1][id2] = Number(price);
                           break
                   }
                   
               },
               prepare(new_value, option) {
                   return {
                       payload: [
                           new_value,
                           option
                       ]
                   }
               }
           }
     },
     extraReducers: (builder) => {

     }
})

export const { setRoute, onChangeValue } = editRoute.actions;
export default editRoute.reducer;
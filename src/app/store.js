import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import routeGeneralReducer from "../features/getRoute/getRouteData"

export const store = configureStore({
     reducer: {
          counter: counterReducer,
          routeGeneral: routeGeneralReducer,
     }
})
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import routeGeneralReducer from "../features/getRoute/getRouteData";
import createRouteReducer from "../features/createRoute/createRouteData"

export const store = configureStore({
     reducer: {
          counter: counterReducer,
          routeGeneral: routeGeneralReducer,
          createRoute: createRouteReducer,
     }
})
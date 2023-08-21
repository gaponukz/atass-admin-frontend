import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import routeGeneralReducer from "../features/getRoute/getRouteData";
import createRouteReducer from "../features/createRoute/createRouteData";
import editRouteReducer from "../features/editRoute/editRouteData";

export const store = configureStore({
     reducer: {
          counter: counterReducer,
          routeGeneral: routeGeneralReducer,
          createRoute: createRouteReducer,
          editRoute: editRouteReducer,
     }
})


import { AllRoutes, CreateRouteFirst, CreateRouteFourth, CreateRouteThird, EditRouteFirst, EditRouteSecond, EditRouteThird, HeaderNav, RouteFamilly } from "./components";
import { Route, Routes } from "react-router-dom";
import CreateRouteSecond from "./components/create-route/CreateRouteSecond";


function App() {


  return (
    <div className="h-screen">
      <HeaderNav />
      <Routes>
        {/* admin */}
        <Route path="/" element={<AllRoutes />}/>
        <Route path="/users" element={<>Users</>}/>

        {/* route */}
        <Route path="/route" element={<RouteFamilly />}/>
        
        <Route path="/create-route-1" element={<CreateRouteFirst />}/>
        <Route path="/create-route-2" element={<CreateRouteSecond />}/>
        <Route path="/create-route-3" element={<CreateRouteThird />}/>
        <Route path="/create-route-4" element={<CreateRouteFourth />}/>

        <Route path="/edit-route-1" element={<EditRouteFirst />}/>
        <Route path="/edit-route-2" element={<EditRouteSecond />}/>
        <Route path="/edit-route-3" element={<EditRouteThird />}/>
      </Routes>      
    </div>
  );
}

export default App;

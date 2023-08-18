

import { AllRoutes, CreateRouteFirst, HeaderNav, RouteFamilly } from "./components";
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
      </Routes>      
    </div>
  );
}

export default App;

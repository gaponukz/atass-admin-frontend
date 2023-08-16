

import { AllRoutes, HeaderNav, RouteFamilly } from "./components";
import { Route, Routes } from "react-router-dom";

function App() {


  return (
    <div className="h-screen">
      <HeaderNav />
      <Routes>
        {/* admin */}
        <Route path="/" element={<AllRoutes />}/>
        <Route path="/users" element={<>Users</>}/>

        {/* route */}
        <Route path="route" element={<RouteFamilly />}/>
      </Routes>      
    </div>
  );
}

export default App;

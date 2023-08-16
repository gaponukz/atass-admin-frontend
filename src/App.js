

import { AllRoutes, HeaderNav } from "./components";
import { Route, Routes } from "react-router-dom";

function App() {


  return (
    <div className="h-screen">
      <HeaderNav />
      <Routes>
        <Route path="/" element={<AllRoutes />}/>
        <Route path="/users" element={<>Users</>}/>  
      </Routes>      
    </div>
  );
}

export default App;

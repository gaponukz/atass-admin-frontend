import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const CreateRouteSecond = () => {

     const navigate = useNavigate()
     const new_route = useSelector(state => state.createRoute.new_route)
     console.log(new_route);
     return (
          <div>CreateRouteSecond

               <button
                    onClick={() => {
                         navigate("/create-route-1")
                    }}
               >Check</button>
          </div>
     )
}

export default CreateRouteSecond
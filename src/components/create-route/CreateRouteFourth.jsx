import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const CreateRouteFourth = () => {

  // helper
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const new_route = useSelector(state => state.createRoute.new_route)

  console.log(new_route);
  return (
    <div>CreateRouteFourth</div>
  )
}

export default CreateRouteFourth
import { GrFormNextLink } from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { Table } from "react-bootstrap"

const ViewUsers = () => {

     const dispatch = useDispatch()
     const navigate = useNavigate()

     const passengers = useSelector(state => state.editRoute.route_to_change.passengers)
     const route_to_change = useSelector(state => state.editRoute.route_to_change)
     console.log(passengers);
     console.log(route_to_change);
     let count = 0;

     return (
          <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">

               <Table striped bordered hover>
                    <thead>
                         <tr>
                              <th>#</th>
                              <th>Username</th>
                              <th>PhoneNumber</th>
                              <th>Gmail</th>
                              <th>In</th>
                              <th>Out</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr>
                              {passengers.map((passenger) => {
                                   count++;
                    //console.log("u");
                    let move_in = "";
                    let move_out = "";
                    // in
                    if (route_to_change.move_from.id === passenger.moving_from_id) {
                         move_in = route_to_change.move_from.place.city
                    }
                    for (let i = 0; i < route_to_change.sub_spots.length; i++) {
                         if (route_to_change.sub_spots[i].id === passenger.moving_from_id)
                              move_in = route_to_change.sub_spots[i].place.city
                    }
                    if (route_to_change.move_to.id === passenger.moving_from_id)
                         move_in = route_to_change.move_to.place.city

                    // out
                    if (route_to_change.move_from.id === passenger.moving_towards_id) {
                         move_out = route_to_change.move_to.place.city
                    }
                    for (let i = 0; i < route_to_change.sub_spots.length; i++) {
                         //console.log(route_to_change.sub_spots[i].id, passenger.moving_towards_id);
                         if (route_to_change.sub_spots[i].id === passenger.moving_towards_id) {
                              move_out = route_to_change.sub_spots[i].place.city
                              //console.log("here");
                         }

                    }
                    if (route_to_change.move_to.id === passenger.moving_towards_id)
                         move_out = route_to_change.move_to.place.city

                                   return (
                                        <>
                                             <td>{count}</td>
                                             <td>{passenger.full_name}</td>
                                             <td>{passenger.phone_number}</td>
                                             <td>{passenger.gmail}</td>
                                             <td>{passenger.gmail}</td>
                                             <td>{move_out}</td>

                                        </>
                                   )
                              })}
                         </tr>
                         
                    </tbody>
               </Table>


               <div className="flex flex-row mb-8 justify-center items-center">
                    <NavLink
                         to="/edit-route-4"
                         className="flex flex-row mt-8 rounded-lg border-2 border-cyan-400 w-[90px] h-[40px] justify-center items-center no-underline text-black"
                    >
                         <p className=" text-redstone-900 mb-[5px]">Далі</p>
                         <GrFormNextLink size={20} color="" />
                    </NavLink>
               </div>
          </div>
     )
}

export default ViewUsers
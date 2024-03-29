import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRouteGeneralInfo } from "../features/getRoute/getRouteData";
import { NavLink } from "react-router-dom";

const AllRoutes = () => {

     // helper
     const dispatch = useDispatch();

     const routes = useSelector(state => state.routeGeneral.routes)

     useEffect(() => {
          dispatch(getRouteGeneralInfo())
     }, [])

     // console.log(routes);

     return (
          <div className='p-8'>
               <div className='flex flex-row items-center justify-center gap-1'>
                    <div className='border-2 border-gray-300 rounded-lg w-2/4 mt-[50px]'>
                         {routes?.map((route) => (
                              <NavLink className='no-underline text-black' to={`route?move_from_city=${route.move_from.city}&move_to_city=${route.move_to.city}`} key={route.move_from.city}>
                                   <div className='border-b-2 border-gray-300'>
                                        <div className='relative p-4'>
                                             <div className='flex flex-row gap-1'>
                                                  <p className='font-bold'>{route.move_from.city}</p>-<p className='font-bold'>{route.move_to.city}</p>
                                             </div>
                                             <div>
                                                  <p className=''>{route.move_from.country}, {route.move_from.city}, {route.move_from.street}</p>
                                                  <p className=''>{route.move_to.country}, {route.move_to.city}, {route.move_to.street}</p>
                                             </div>
                                             <div className='absolute ml-[500px] mt-[-130px] bg-blue-600 w-auto px-2 rounded-full text-white font-bold'>{route.count}</div>
                                        </div>
                                   </div>
                              </NavLink>
                         ))}
                    </div>
                    
                    <NavLink className='border-2 border-gray-300 mt-[-300px] px-[16px] py-[4px] rounded-lg text-xl no-underline text-black' to="/create-route-1">
                         Додати маршрут
                    </NavLink>

               </div>
          </div>
     )
}

export default AllRoutes
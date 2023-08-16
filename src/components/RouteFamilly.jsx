import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Checkbox, Modal, Button } from '@mui/material';
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { getRouteFamillyInfo } from "../features/getRoute/getRouteData"

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const RouteFamilly = () => {

     // helper
     const search = useLocation().search
     const searchParams = new URLSearchParams(search)
     const dispatch = useDispatch()

     // logic
     const move_from_city = searchParams.get("move_from_city")
     const move_to_city = searchParams.get("move_to_city")
     const familly_routes = useSelector(state => state.routeGeneral.familly_routes)

     console.log(move_from_city, move_to_city, familly_routes);

     useEffect(() => {
          dispatch(getRouteFamillyInfo({ move_from: move_from_city, move_to: move_to_city }))
     }, [])

     // ui
     const [openShow, setOpenShow] = useState(false);
     const handleOpenShow = () => setOpenShow(true);
     const handleCloseShow = () => setOpenShow(false);

     const [openDelete, setOpenDelete] = useState(false);
     const handleOpenDelete = () => setOpenDelete(true);
     const handleCloseDelete = () => setOpenDelete(false);

     return (
          <>
               <div className='bg-white p-8'>
                    <div className='flex flex-col items-center justify-center'>
                         <div className='border-2 border-gray-300 rounded-lg w-2/4 mt-[50px]'>
                              <div className='p-2 m-4 border-2 border-red-300 mr-[300px] w-[305px] rounded-md'>
                                   <NavLink className="no-underline text-red-500 hover:text-red-500" to="/">Повернутися до головного маршруту</NavLink>
                              </div>

                              <Modal
                                   open={openShow}
                                   onClose={handleCloseShow}
                                   aria-labelledby="modal-modal-title"
                                   aria-describedby="modal-modal-description"
                                   className='flex flex-row justify-center items-center'
                              >
                                   <div className='w-[300px] h-[200px] bg-white text-black '>
                                        Show
                                   </div>
                                   {/* <ShowInfoDetail info={route[0]}/> */}
                              </Modal>

                              <Modal
                                   open={openDelete}
                                   onClose={handleCloseDelete}
                                   aria-labelledby="modal-modal-title"
                                   aria-describedby="modal-modal-description"
                                   className='flex flex-row justify-center items-center'
                              >
                                   <div className='w-1/2 h-1/2 bg-white text-black shadow-md rounded-lg flex flex-col justify-center items-center'>
                                        <p className='font-bold text-2xl mt-8'>Ви впевнені, що хочете видалити цей маршрут?</p>

                                        <div className='w-auto'>
                                             <Button variant="outlined" color="error"
                                                  onClick={() => { console.log("tyt"); }}
                                             >
                                                  Видалити
                                             </Button>
                                        </div>
                                   </div>
                              </Modal>

                              {familly_routes.map((route, index) => (
                                   <>
                                        <div className='flex flex-row border-b-2 border-gray-300' key={route.move_from.id}>
                                             <Checkbox {...label} defaultChecked />
                                             <div key={index}>
                                                  <div className=''>
                                                       <div className='relative px-1'>
                                                            <div className='flex flex-row gap-1 '>
                                                                 <div className='mt-3 flex flex-row gap-1'>
                                                                      <p className=''>{route.move_from.place.city}</p>-<p className=' '>{route.move_to.place.city},</p>
                                                                      <p>{route.move_from.date}</p>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className='ml-auto mr-4 gap-1 flex flex-row mt-2'>
                                                  <div className=''>
                                                       <button onClick={() => {
                                                            console.log("click");
                                                       }} ><NavLink to="/edit-route-1"><CiEdit className='no-underline text-black mt-1 mr-4' size={25} /></NavLink></button>
                                                  </div>
                                                  <div className=''>
                                                       <Button onClick={handleOpenDelete} ><AiFillDelete className='no-underline text-black' size={23} /></Button>
                                                  </div>
                                                  <div className=''>
                                                       <Button onClick={handleOpenShow} ><BiShow className='no-underline text-black' size={23} /></Button>
                                                  </div>

                                             </div>
                                        </div>
                                   </>
                              ))}
                         </div>
                    </div>
               </div>
          </>
     )
}

export default RouteFamilly
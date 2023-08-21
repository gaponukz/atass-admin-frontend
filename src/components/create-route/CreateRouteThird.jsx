import { useForm } from "react-hook-form";
import { useState } from "react";

import CheckSteps from "./CheckSteps";

import { Button, TextField, Modal } from '@mui/material'
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";

import { useDispatch } from 'react-redux';
import { change4, addSubSpot } from "../../features/createRoute/createRouteData";
// import { change4, addSubSpot } from "../features/routeCreator/routeCreateSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";


const CreateRouteThird = () => {
  // helper
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const new_route = useSelector(state => state.createRoute.new_route)
  const subSpots = useSelector(state => state.createRoute.new_route.route_prototype.sub_spots)
  const check = useSelector(state => state.createRoute.steps)

  // logic
  const [openShow, setOpenShow] = useState(false);
  const handleOpenShow = () => setOpenShow(true);
  const handleCloseShow = () => setOpenShow(false);

  const { handleSubmit } = useForm()

  const onSubmit = (data) => {
    dispatch(change4())
    console.log(data);
    navigate("/create-route-4")
  }

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [map, setMap] = useState("");

  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");


  //console.log(new_route);
  return (
    <div className="bg-white p-8 ">
            
            <Modal
                open={openShow}
                onClose={handleCloseShow}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='flex flex-row justify-center mt-5 '
            >
                <div className='w-3/4 h-5/6 bg-white text-black rounded-lg shadow-lg overflow-auto p-4 '>
                    <p className="font-semibold text-xl p-2 mb-[0px]">Додавання проміжної точки</p>
                    <hr className="my-[1px]" />

                    <div className="p-4 flex flex-col">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Країна"
                            multiline
                            className="mt-4 w-3/6"
                            onChange={(e) => setCountry(e.target.value)}
                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Місто"
                            multiline
                            className="mt-4 w-3/6"
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Вулиця"
                            multiline
                            className="mt-4 w-3/6"
                            onChange={(e) => setStreet(e.target.value)}
                        />

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Мапа"
                            multiline
                            className="mt-4 w-3/6 mb-4"
                            onChange={(e) => setMap(e.target.value)}
                        />

                        <div
                            className="flex flex-row items-center justify-start gap-2"
                        >
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Дні"
                                multiline
                                className=""
                                onChange={(e) => setDays(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Години"
                                multiline
                                className=""
                                onChange={(e) => setHours(e.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Хвилини"
                                multiline
                                className=""
                                onChange={(e) => setMinutes(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="flex flex-row gap-5 justify-center items-center mt-4 mb-4">
                        <Button
                            onClick={handleCloseShow}
                            variant="contained"
                            color="error"
                        >Закрити</Button>

                        <Button
                            onClick={() => {
                                
                                if (!days) 
                                  setDays(0);
                                else if (!hours)
                                  setHours(0);
                                else if (!minutes)
                                  setMinutes(0);

                                let time = days * 86400 + hours * 3600 + minutes * 60
                                
                                dispatch(addSubSpot(country, city, street, map, time))
                                setCountry("");
                                setCity("");
                                setStreet("");
                                setMap("");
                                setDays("");
                                setHours("");
                                setMinutes("");

                                handleCloseShow();
                            }}
                            variant="contained"
                        >Підтвердити</Button>
                    </div>

                </div>
            </Modal>

            <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">
                <div className="flex flex-row gap-1">
                    <CheckSteps check={check}/>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="min-h-[200px]">

                    {subSpots.map((obj) => (
                        <div key={obj.id} className="rounded-lg">
                            <div className="flex flex-row justify-between gap-1">
                                <div className="flex flex-row justify-start gap-1">
                                    <p className="text-xl font-bold">{obj.place.country},</p>
                                    <p className="text-xl font-bold">{obj.place.city},</p>
                                    <p className="text-xl font-bold">{obj.place.street}</p>
                                </div>
                                <div className="flex flex-row justify-center gap-3">
                                    <AiFillDelete size={23} />
                                    <BiShow size={23} />
                                    <CiEdit size={23} />
                                </div>
                            </div>
                            <p>Прибуде через: Днів: {Math.floor(obj.from_start / 86400).toString().padStart(1, "0")} Годин: {
                              (Math.floor(obj.from_start / 3600).toString().padStart(1, "0") === "24") ? (<>0</>) : (<>{Math.floor(obj.from_start % 86400 / 3600).toString().padStart(1, "0")}</>)
                            } Хвилин: {
                                (Math.floor(obj.from_start / 60).toString().padStart(1, "0") === "1440") ? (<>0</>) : (<>{(Math.floor(obj.from_start % 3600 / 60)).toString().padStart(1, "0")}</>)
                            }</p>
                            <hr />
                        </div>))}
                    <div
                        onClick={handleOpenShow}
                        className="border-2 border-gray-800 h-[40px] w-[88px] rounded-lg flex justify-center items-center"
                    >
                        <p className="mt-3 mx-auto font-semibold text-xl">Додати</p>
                    </div>

                    <div className="flex flex-row mb-8 justify-center items-center">
                        <button
                            className="flex flex-row mt-8 rounded-lg border-2 border-red-500 w-[100px] h-[40px] justify-center items-center mr-[100px]"
                        >
                            <p className=" text-redstone-900 mb-[5px] mr-2">Вийти</p>
                            <ImCancelCircle size={20} />
                        </button>
                        <button
                            className="flex flex-row mt-8 rounded-lg border-2 border-cyan-400 w-[90px] h-[40px] justify-center items-center ml-[100px]"
                        >
                            <p className=" text-redstone-900 mb-[5px]">Далі</p>
                            <GrFormNextLink size={20} color="" />
                        </button>

                    </div>
                </form>
            </div>
        </div>
  )
}

export default CreateRouteThird
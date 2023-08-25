import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

import { nanoid } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";
import { Button, TextField, Modal } from '@mui/material';

import { useForm } from "react-hook-form";
import { useState } from "react";
import CheckSteps from "./CheckSteps";
import { change2, addArrayDatetime, createRoute1, deleteArrayDatetime } from "../../features/createRoute/createRouteData";

const sub = ({ from, to, func }) => {
     // console.log(from, to, func);
     func(addArrayDatetime([
          `${from.year}-${(from.month).toString().padStart(2, "0")}-${(from.day).toString().padStart(2, "0")} ${from.hour}:${from.minute}:${from.second}`,
          `${to.year}-${(to.month).toString().padStart(2, "0")}-${(to.day).toString().padStart(2, "0")} ${to.hour}:${to.minute}:${to.second}`
     ]))

     //`${to[0].year}-${(to[0].month.number).toString().padStart(2, "0")}-${(to[0].day).toString().padStart(2, "0")} ${to[0].hour}:${to[0].minute}:${to[0].second}`

}

const schema = yup.object({
     fromCountry: yup.string().required(),
     fromCity: yup.string().required(),
     fromStreet: yup.string().required(),
     toCountry: yup.string().required(),
     toCity: yup.string().required(),
     toStreet: yup.string().required(),
     numberPlaces: yup.number().required(),
     map1: yup.string(),
     map2: yup.string(),
});

const CreateRouteFirst = () => {

     // helper
     const navigate = useNavigate();
     const dispatch = useDispatch();

     // logic
     const test = useSelector(state => state.createRoute.test)
     const new_route = useSelector(state => state.createRoute.new_route)
     const datetimes = useSelector(state => state.createRoute.new_route.departure_dates)
     const check = useSelector(state => state.createRoute.steps)

     const [dates1, setDates1] = useState(
          new Date()
          // [].map((number) =>
          //      new DateObject().set({
          //           day: number,
          //           hour: number,
          //           minute: number,
          //           second: number,
          //      })
          // )
     );
     const [dates2, setDates2] = useState(
          new Date()
          // [].map((number) =>
          //      new DateObject().set({
          //           day: number,
          //           hour: number,
          //           minute: number,
          //           second: number,
          //      })
          // )
     );

     const [openShow, setOpenShow] = useState(false);
     const handleOpenShow = () => setOpenShow(true);
     const handleCloseShow = () => setOpenShow(false);


     const { register, handleSubmit, formState: { errors }, resetField } = useForm({
          resolver: yupResolver(schema),
          defaultValues: {
               fromCountry: new_route.route_prototype.move_from.place.country,
               fromCity: new_route.route_prototype.move_from.place.city,
               fromStreet: new_route.route_prototype.move_from.place.street,
               toCountry: new_route.route_prototype.move_to.place.country,
               toCity: new_route.route_prototype.move_to.place.city,
               toStreet: new_route.route_prototype.move_to.place.street,
               numberPlaces: new_route.route_prototype.passengers_number,
               map1: new_route.route_prototype.move_from.place.map_url,
               map2: new_route.route_prototype.move_to.place.map_url,
          }
     })

     const onSubmit = (data) => {
          dispatch(createRoute1(data.fromCountry, data.fromCity, data.fromStreet,
               data.toCountry, data.toCity, data.toStreet, data.numberPlaces, data.map1, data.map2))

          dispatch(change2())
          navigate("/create-route-2");
          // console.log("submit", data);
     }


     //console.log(new_route);
     return (
          <div className="bg-white p-8 ">
               <Modal
                    open={openShow}
                    onClose={handleCloseShow}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='flex flex-row justify-center mt-5'
               >
                    <div className='w-3/4 h-3/4 bg-white text-black rounded-lg shadow-lg'>
                         <p className="font-semibold text-xl p-2 mb-[0px]">Встановіть Дати</p>
                         <hr className="my-[1px]" />
                         <div className="flex flex-row p-6">
                              <p>Час відправлення: </p>
                              <DatePicker
                                   style={{ height: "30px", width: "400px", marginLeft: "10px" }}
                                   value={dates2}
                                   onChange={setDates2}
                                   format="MM/DD/YYYY HH:mm:ss"
                                   multiple={false}
                                   plugins={[
                                        <TimePicker position="bottom" />,
                                        <DatePanel markFocused />
                                   ]}
                              />
                         </div>

                         <div className="flex flex-row p-6">
                              <p>Час прибуття: </p>
                              <DatePicker
                                   style={{ height: "30px", width: "400px", marginLeft: '45px' }}
                                   value={dates1}
                                   className=""
                                   onChange={setDates1}
                                   format="MM/DD/YYYY HH:mm:ss"
                                   multiple={false}
                                   plugins={[
                                        <TimePicker position="bottom" />,
                                        <DatePanel markFocused />
                                   ]}
                              />
                         </div>

                         <div className="flex flex-row gap-5 justify-center items-center mt-[100px]">
                              <Button
                                   onClick={handleCloseShow}
                                   variant="contained"
                                   color="error"
                              >Закрити</Button>

                              <Button
                                   onClick={() => {
                                        //console.log(dates1);
                                        //console.log(`${dates1.day}-${dates1.month}-${dates1.year} ${dates1.hour}:${dates1.minute}:${dates1.second}`);
                                        sub({ from: dates1, to: dates2, func: dispatch })
                                        setDates1(new Date())
                                        setDates2(new Date())
                                        // console.log(`${dates1[0].day}-${dates1[0].month.number}-${dates1[0].year} ${dates1[0].hour}:${dates1[0].minute}:${dates1[0].second}`);
                                   }}
                                   variant="contained"
                              >Підтвердити</Button>
                         </div>

                    </div>
               </Modal>

               <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">
                    <div className="flex flex-row gap-1">
                         <CheckSteps check={check} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>

                         <div className="mt-4 min-h-[70px] flex justify-center">
                              <TextField
                                   id="outlined-basic"
                                   label="Країна відпр.*"
                                   variant="outlined"


                                   InputLabelProps={{
                                        shrink: true,
                                   }}
                                   sx={{
                                        width: {
                                             xs: "356px",
                                             md: "450px"
                                        }
                                   }}
                                   error={!errors.fromCountry?.message ? false : true}
                                   color={!errors.fromCountry?.message ? "primary" : "error"}
                                   {...register("fromCountry")}
                              />
                         </div>

                         <div className="mt-4 min-h-[70px] flex justify-center">
                              <TextField
                                   id="outlined-basic"
                                   label="Населений пункт(місто, селище) відпр.*"
                                   variant="outlined"
                                   InputLabelProps={{
                                        shrink: true,
                                   }}
                                   sx={{
                                        width: {
                                             xs: "356px",
                                             md: "450px"
                                        }
                                   }}
                                   error={!errors.fromCity?.message ? false : true}
                                   color={!errors.fromCity?.message ? "primary" : "error"}
                                   {...register("fromCity")}
                              />
                         </div>

                         <div className="mt-4 min-h-[70px] flex justify-center">

                              <TextField
                                   id="outlined-basic"
                                   label="Вулиця відпр.*"
                                   variant="outlined"
                                   InputLabelProps={{
                                        shrink: true,
                                   }}
                                   sx={{
                                        width: {
                                             xs: "356px",
                                             md: "450px"
                                        }
                                   }}
                                   error={!errors.fromStreet?.message ? false : true}
                                   color={!errors.fromStreet?.message ? "primary" : "error"}
                                   {...register("fromStreet")}
                              />
                         </div>

                         <div className="mt-4 min-h-[70px] flex justify-center">
                              <TextField
                                   id="outlined-basic"
                                   label="Мапа"
                                   variant="outlined"
                                   InputLabelProps={{
                                        shrink: true,
                                   }}
                                   sx={{
                                        width: {
                                             xs: "356px",
                                             md: "450px"
                                        }
                                   }}
                                   error={!errors.map1?.message ? false : true}
                                   color={!errors.map1?.message ? "primary" : "error"}
                                   {...register("map1")}
                              />
                         </div>

                         <div className="mt-4 min-h-[70px] flex justify-center">
                              <TextField
                                   id="outlined-basic"
                                   label="Країна приб.*"
                                   variant="outlined"
                                   InputLabelProps={{
                                        shrink: true,
                                   }}
                                   sx={{
                                        width: {
                                             xs: "356px",
                                             md: "450px"
                                        }
                                   }}
                                   error={!errors.toCountry?.message ? false : true}
                                   color={!errors.toCountry?.message ? "primary" : "error"}
                                   {...register("toCountry")}
                              />
                         </div>

                         <div className="mt-4 min-h-[70px] flex justify-center">
                              <TextField
                                   id="outlined-basic"
                                   label="Населений пункт(місто, селище) приб.*"
                                   variant="outlined"
                                   InputLabelProps={{
                                        shrink: true,
                                   }}
                                   sx={{
                                        width: {
                                             xs: "356px",
                                             md: "450px"
                                        }
                                   }}
                                   error={!errors.toCity?.message ? false : true}
                                   color={!errors.toCity?.message ? "primary" : "error"}
                                   {...register("toCity")}
                              />
                         </div>

                         <div className="mt-4 min-h-[70px] flex justify-center">
                              <TextField
                                   id="outlined-basic"
                                   label="Вулиця приб.*"
                                   variant="outlined"
                                   InputLabelProps={{
                                        shrink: true,
                                   }}
                                   sx={{
                                        width: {
                                             xs: "356px",
                                             md: "450px"
                                        }
                                   }}
                                   error={!errors.toStreet?.message ? false : true}
                                   color={!errors.toStreet?.message ? "primary" : "error"}
                                   {...register("toStreet")}
                              />
                         </div>

                         <div className="mt-4 min-h-[70px] flex justify-center">
                              <TextField
                                   id="outlined-basic"
                                   label="Мапа"
                                   variant="outlined"
                                   InputLabelProps={{
                                        shrink: true,
                                   }}
                                   sx={{
                                        width: {
                                             xs: "356px",
                                             md: "450px"
                                        }
                                   }}
                                   error={!errors.map2?.message ? false : true}
                                   color={!errors.map2?.message ? "primary" : "error"}
                                   {...register("map2")}
                              />
                         </div>

                         <div className="mt-4 min-h-[70px] flex justify-center">
                              <TextField
                                   id="outlined-basic"
                                   label="Число пасажирів*"
                                   variant="outlined"
                                   InputLabelProps={{
                                        shrink: true,
                                   }}
                                   sx={{
                                        width: {
                                             xs: "356px",
                                             md: "450px"
                                        }
                                   }}
                                   error={!errors.numberPlaces?.message ? false : true}
                                   color={!errors.numberPlaces?.message ? "primary" : "error"}
                                   {...register("numberPlaces")}
                              />
                         </div>


                         <div
                              onClick={handleOpenShow}
                              className="border-2 border-gray-800 h-[40px] w-[88px] rounded-lg ml-auto flex justify-center items-center"
                         >
                              <p className="mt-3 mx-auto font-semibold text-xl">Додати</p>
                         </div>

                         <div className="flex flex-col mt-5 mb-10 mx-[20px] h-auto border-t-2 border-gray-300">
                              <div className="flex flex-row justify-between" >
                                   <p className="font-bold text-xl">Відправлення</p>
                                   <p className="font-bold text-xl">Прибуття</p>
                              </div>

                              {datetimes?.map((date, index) => (
                                   <div className="flex flex-row justify-between" key={nanoid()}>
                                        <p className="">{date[1]}</p>
                                        <p>{date[0]}</p>
                                        {/* <p>{months.indexOf(date[0].slice(4, 7))} {date[0].slice(8, 16)}</p>  */}
                                        <button
                                             type="button"
                                             onClick={() => {
                                                  
                                                  dispatch(deleteArrayDatetime(index));
                                             }}
                                        >
                                             <ImCancelCircle size={20} />
                                        </button>
                                   </div>))}
                         </div>


                         <div className="flex flex-row mb-8 justify-center items-center">
                              <button
                                   onClick={() => {
                                        navigate("/")
                                   }}
                                   className="flex flex-row mt-8 rounded-lg border-2 border-red-500 w-[100px] h-[40px] justify-center items-center mr-[100px]"
                              >
                                   <p className=" text-redstone-900 mb-[5px] mr-2">Вийти</p>
                                   <ImCancelCircle size={20} />
                              </button>
                              <button
                                   type="submit"
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

export default CreateRouteFirst
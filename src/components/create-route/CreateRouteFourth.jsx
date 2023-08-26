import { useForm } from "react-hook-form";

import { useDispatch } from 'react-redux';
import CheckSteps from "./CheckSteps";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ImCancelCircle } from "react-icons/im";
import { GrFormNextLink } from "react-icons/gr";
import TableInput from "../TableInput";
import { postNewRoute, submitPrices } from "../../features/createRoute/createRouteData";
import { ToastContainer, toast } from "react-toastify";


const CreateRouteFourth = () => {

    // helper
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // logic
    const new_route = useSelector(state => state.createRoute.new_route)
    const subSpots = useSelector(state => state.createRoute.new_route.route_prototype.sub_spots)
    const check = useSelector(state => state.createRoute.steps)
    const submit_price = useSelector(state => state.createRoute.submit_price)
    
    const { handleSubmit } = useForm()

    const onSubmit = (data) => {
        dispatch(submitPrices(prices, subSpots))
        toast("Ціни підтверджено!", { autoClose: 1500 })
        // dispatch(postNewRoute({ new_route: new_route }))
        // navigate("/")
    }

    let horizon = [{ city: new_route.route_prototype.move_from.place.city, id: new_route.route_prototype.move_from.id }]
    for (let i = 0; i < subSpots.length; i++) {
        horizon.push({
            city: subSpots[i].place.city,
            id: subSpots[i].id
        });
    }
    let vertical = []
    for (let i = 0; i < subSpots.length; i++) {
        vertical.push({
            city: subSpots[i].place.city,
            id: subSpots[i].id
        });
    }
    vertical.push({ city: new_route.route_prototype.move_to.place.city, id: new_route.route_prototype.move_to.id });

    let checkr = [];
    let check_rvs = [];

    let prices = {}
    for (let j = 0; j < horizon.length; j++) {
        prices[horizon[j].id] = {}
        for (let i = j; i < vertical.length; i++) {
            prices[horizon[j].id][vertical[i].id] = 0;
        }
    }

    
    console.log(new_route, submit_price);
    return (
        
        <div className="bg-white p-8 ">
            <div className="border-2 border-gray-300 w-[600px] mx-auto flex flex-col rounded-lg p-4">
                <div className="flex flex-row gap-1">
                    <CheckSteps check={check} />
                </div>
                <ToastContainer />

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="relative border-2 border-600-gray p-4 rounded-md">
                        <div className="flex flex-row gap-6 ml-[90px] font-bold text-xl">
                            {horizon.map(obg => (<div className="w-[120px]" key={obg.id}>{obg.city}</div>))}
                        </div>
                        <hr></hr>
                        <div className="flex flex-col gap-3 font-bold text-xl mt-[20px]">
                            {vertical.map(obg => (<div className="mb-[15px]" key={obg.id}>{obg.city}</div>))}
                        </div>

                        <div className="ml-[80px] mb-[10px]">
                            {/* <TableInput horizon={horizon} vertical={vertical}/> */}
                            <div className="mt-[-165px]">
                                <div>
                                    <div className='flex flex-row gap-1'>
                                        {horizon.map(obj1 => {
                                            return (<div key={obj1.id} className='flex flex-col gap-3 mt-1 ml-3'>
                                                {vertical.map(obj2 => {
                                                    checkr.push(String(`${obj1.id}-${obj2.id}`))
                                                    check_rvs.push(String(`${obj2.id}-${obj1.id}`))

                                                    if (obj1.id !== obj2.id) {
                                                        if (check_rvs.includes(String(`${obj1.id}-${obj2.id}`))) {
                                                            return (
                                                                <div key={`${obj2.id}-${obj1.id}`} className=' h-[40px] w-[120px] bg-gray-300 rounded-lg'>

                                                                </div>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <div className='flex flex-row' key={`${obj1.id}-${obj2.id}`}>
                                                                    {<input
                                                                        onChange={(e) => {
                                                                            prices[obj1.id][obj2.id] = Number(e.target.value);
                                                                        }}
                                                                        placeholder=""
                                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                    />}
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                    else {
                                                        return (
                                                            <div key={obj1.id} className='h-[40px] w-[120px] bg-gray-300 rounded-lg'>
                                                                <div
                                                                    className=""
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row mb-8 justify-center items-center">
                        <button
                            className="flex flex-row mt-8 rounded-lg border-2 border-red-500 w-[100px] h-[40px] justify-center items-center mr-[100px]"
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            <p className=" text-redstone-900 mb-[5px] mr-2">Вийти</p>
                            <ImCancelCircle size={20} />
                        </button>

                        {(submit_price) ? (
                            <button
                                type="button"
                                className="flex flex-row mt-8 rounded-lg border-2 border-cyan-400 w-[90px] h-[40px] justify-center items-center ml-[100px]"
                                onClick={() => {
                                    dispatch(postNewRoute({ new_route: new_route }))
                                    navigate("/")
                                }}
                            >
                            <p className=" text-redstone-900 mb-[5px]">Далі</p>
                            <GrFormNextLink size={20} color="" />
                        </button>
                        ) : (
                            <button
                                className="flex flex-row mt-8 rounded-lg border-2 border-cyan-400 w-[120px] h-[40px] justify-center items-center ml-[100px]"
                            >
                            <p className=" text-redstone-900 mb-[5px]">Підтвердити ціни</p>
                            <GrFormNextLink size={20} color="" />
                        </button>
                        )}
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateRouteFourth
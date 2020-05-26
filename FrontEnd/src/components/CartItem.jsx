import React, { useState, /*useEffect*/ } from 'react';
import axios from 'axios';

export var displayRandom = () => {
    var rand = Math.floor(Math.random() * 100);
    var imgStr = "https://generative-placeholders.glitch.me/image?width=500&height=500&img=".concat(rand);
    return (<><img src={imgStr} alt="imgStr" /></>);
}
export const CartItem = (props) => {
    const [count, setCount] = useState(props.value.quantity);
    const [totalCost, setTotalCost] = useState('');
    const [/*removeItem*/, setRemoveItem] = useState(false);

    const UpdateCart = async () => {
        var upTotalCost = document.getElementById('totalcost').innerHTML;
        console.log(props.value);
        //     await axios.put(PutCartUpdate(props.value.offering_key, count), {}, TokenHeader(props.token)).then((res) => { });
        axios.post("http://localhost:3001/updatecart", { email: props.email, quantity: count, totalCost: upTotalCost, propsOne: props.value.offering_key });
        window.location.replace('/cart');
    }

    const presentCounter = (<div type="number" className="h-10 font-semibold flex justify-center text-gray-500 w-1/3 items-center text-2xl" > {count} </div>)
    const changeCounter = (<div type="number" className="h-10 font-semibold flex justify-center text-gray-800 w-1/3 items-center text-2xl" > {count} </div>)
    const changeUpdate = (<button onClick={() => UpdateCart()} className="flex justify-center text-base rounded border-2 border-orange-500 px-6 mr-4 font-bold">Update Cart</button>)
    const changeUpdateMobile = (<button onClick={() => UpdateCart()} className="justify-center mx-20 my-4 rounded hover:bg-orange-400 border-2 border-orange-500 px-5 font-bold">Update Cart</button>)

    const counters = (
        <div className="justify-center m-4 rounded h-11 border-2 border-orange-500">
            <div className="flex font-semibold hover:text-black focus:text-black text-gray-700" >
                <button onClick={() => minusItem()} className=" flex justify-center rounded text-gray-600 hover:text-gray-700 hover:bg-orange-400 h-full w-1/3 border-r-2 border-orange-500">
                    <div className="mx-20 flex items-center text-2xl h-10">-</div>
                </button>
                {count === props.value.quantity ? presentCounter : changeCounter}
                <button onClick={() => plusItem()} className="flex justify-center rounded text-gray-700 hover:text-gray-700 hover:bg-orange-400 h-full text-right w-1/3 border-l-2 border-orange-500">
                    <div className="flex items-center text-2xl h-10" >+</div>
                </button>
            </div>
        </div>
    );

    const plusItem = () => {
        setCount(count + 1);
        setTotalCost((Math.round((count + 1) * props.value.unit_retail * 100) / 100).toFixed(2));
      
    }
 
    const minusItem = () => {
        setCount(count - 1);
        if (count === 1) {
            setCount(1)
            setTotalCost((Math.round((count ) * props.value.unit_retail * 100) / 100).toFixed(2));
        }
        else
            setTotalCost((Math.round((count - 1) * props.value.unit_retail * 100) / 100).toFixed(2));
      
    }

    const removeCartItem = async () => {
        axios.post("http://localhost:3001/removecart", { email: props.email, quantity: count,  propsOne: props.value.offering_key });
     //   await axios.put(PutCartUpdate(props.value.offering_key, 0), {}, TokenHeader(props.token)).then((res) => { setRemoveItem(true); });
        window.location.href = '/cart';
    }

    const linktoProduct = () => {
        window.location.assign("/offer/" + props.value.offering_key);
    }
    var multi2 = (a, b) => {

        return (Math.round(a * b * 100) / 100).toFixed(2);
    }
    //console.log(props.email);
    const container = (<div>
        <div className="flex w-full">
            <div className="w-full">
                <div className="flex rounded border border-orange-300 w-full">
                    <div className="w-1/2 md:w-1/3">
                        <div onClick={() => linktoProduct()} className="flex m-2 h-32 md:h-56">{displayRandom()}</div>
                        <div className="md:hidden">
                            {counters}
                            {count === props.value.quantity ? <>
                                <div className="font-bold text-center text-gray-500"> Total: ${props.value.total_cost} </div> </> :
                                <>
                                    <div className="font-bold text-center flex "> Total: $<p id="totalcost">{totalCost}</p></div>
                                    <div>{changeUpdateMobile}</div>
                                </>
                            }
                        </div>
                    </div>

                    <div className="block text-lg w-2/3">
                        <div onClick={() => linktoProduct()} className="cursor-pointer m-4 text-md md:text-2xl font-extrabold hover:text-orange-500 underline">{props.value.product_name}</div>
                        <div className="m-4 text-md md:text-2xl font-extrabold pt-2">${props.value.unit_retail}</div>
                        <button onClick={() => removeCartItem()} className="flex justify-center text-base m-20 h-12 rounded border-2 border-orange-500 px-5 font-bold md:hidden">Remove Item</button>



                    </div>
                    <div className="hidden md:block md:w-1/4 justify-center ">
                        <div className="m-0 md:mr-2">{counters}</div>
                        {count === props.value.quantity ? <>
                            <div className="font-bold text-center text-gray-500 md:mr-4 md:pb-2"> Total: ${props.value.total_cost} </div> </> :
                            <>
                                <div className="font-bold text-center flex"> Total: $<p id="totalcost">{totalCost}</p></div>
                                <div className="my-2">{changeUpdate}</div>
                            </>
                        }

                        <button onClick={() => removeCartItem()} className="flex justify-center text-base rounded border-2 border-orange-500 px-6 mr-12 md:mr-4 font-bold">Remove Item</button>

                    </div>
                </div>

            </div>

        </div>

    </div>)

    return (<>
        {container}
    </>);
}

export const CartItemCheckOut = (props) => {

    const linktoProduct = () => {
        window.location.assign("/offer/" + props.value.offering_key);
    }
    const container = (<div>
        <div className="flex w-full ">
            <div className="flex rounded border border-orange-300 w-full">
                <div onClick={() => linktoProduct()} className="flex w-full h-48 md:w-1/4 md:h-56">{displayRandom()}</div>
                <div className="block text-lg w-full">
                    <div onClick={() => linktoProduct()} className="cursor-pointer m-4 text-md md:text-2xl font-extrabold  hover:text-orange-500 hover:underline">{props.value.product_name}</div>
                    <div className="m-4 text-2xl font-extrabold pt-2">${props.value.unit_retail}</div>
                </div>

                <div className="flex-none">
                    <div className="text-base md:text-xl font-bold text-right pt-4 pr-2">
                        Quantity: {props.value.quantity}
                    </div>
                    <div className="text-base md:text-xl font-bold text-right pt-4 pr-2">
                        Total Cost: ${props.value.total_cost}
                    </div>
                </div>
            </div>
        </div>
    </div>)

    return (<>
        {container}
    </>);
}

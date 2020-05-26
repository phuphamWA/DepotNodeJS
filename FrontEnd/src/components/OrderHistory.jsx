import * as React from 'react';
import { useState } from 'react';
import { Collapse } from 'react-collapse';

export const OrderHistory = (props) => {
    console.log(props.value);
    var offerArray = props.value.itemArray;
    const [isOpen, setIsOpen] = useState(false);

    return (<>
    
        <div className=" ">
            <div className="bg-gray-400">
                <div onClick={() => setIsOpen(!isOpen)} className="ml-2 pt-2 text-md md:text-lg " >Date: {props.value.time}</div>
                <div onClick={() => setIsOpen(!isOpen)} className="ml-2 items-right text-sm" > Order#: {props.value.offerNumber}</div>  
            </div>
            <Collapse isOpened={!isOpen}>  
              
                <EachOffer orderID={props.value.offerNumber} offerings={offerArray} />
                <br />
                <div className="mr-2 text-right font-bold">Total Items: {props.value.itemArray.length-1}</div>
                <div className="mr-2 text-right font-bold">Total Price: ${props.value.totalCost}</div>
            </Collapse >
            </div>
        </>
    );
}
const linktoItem = (itemId) => {
    window.location.assign("/offer/" + itemId);
}
const EachOffer = (props) => {
    const array = props.offerings;
    const container = array.map(e => (<>
        <div className="block md:flex m-2">
            <div onClick={() => linktoItem(e.offering_key)} className="w-full md:w-1/2 cursor-pointer hover:font-bold">
                <div className="underline" > {e.product_name}</div>
            </div>
            <div className="w-full md:w-1/2 md:text-center">Quantity: {e.quantity}</div>
            <div className="w-full md:w-1/2 md:text-right ">Price: ${e.unit_retail}</div>
        </div>
    </>));
    return (<>
        {container}
        </>)
}

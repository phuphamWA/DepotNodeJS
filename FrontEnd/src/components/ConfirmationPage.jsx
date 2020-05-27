import React, { useState, useEffect } from 'react';
import { PurchaseHistory } from '../ListOfLinks';
import FireBaseSetup from '../FireBaseSetup';
import axios from 'axios';

export const ConfirmationPage = () => {
    const [productInfo, setProductInfo] = useState([]);
    const [offering, setOffering] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [email, setEmail] = useState("");
    const [totalCost, setTotalCost] = useState(0);
    const [offerID, setOfferId] = useState("");
    const [/*load*/, setLoad] = useState(false);
    const [/*uid*/, setUID] = useState("");
    const [/*userToken*/, setUserToken] = useState("");
    useEffect(() => {
        FireBaseSetup.isInitialized().then(user => {
            if (user) {
                user.getIdToken().then(function (idToken) {

                    fetch(user.email);
                    setEmail(user.email);
                    setUID(user.uid);
                });
              
                
            }
        });
    }, []);

    const page_title = (
        <div className="mt-4 justify-center w-full h-auto md:h-auto">
            <div className="py-2 text-lg md:text-3xl font-extrabold text-center"> Your Order Is Confirmed! </div>
        </div>
    );

    const fetch = async (e) => {
        await axios.post(PurchaseHistory, { email: e }).then((res) => {
            console.log(res);
            console.log(res.data[(res.data.length - 1)]);
            setProductInfo(res.data[(res.data.length - 1)].itemArray);
            setTotalItem(res.data[(res.data.length - 1)].itemArray.length);
            setOffering(res.data[(res.data.length - 1)].itemArray);
            setTotalCost(res.data[(res.data.length - 1)].totalCost);
            setOfferId(res.data[(res.data.length - 1)].offerNumber);
            setLoad(true);
        }).catch((err) => { });
    }

    const ListItem =
        offering.map(e => {
            return (<>
                <br />
                <div className="block ml-2 md:flex justify-center">
                    <div onClick={() => { window.location.href = '/offer/' + e.offering_key }} className="w-full md:w-1/3 font-extrabold cursor-pointer hover:underline hover:font-bold underline text-md">{e.product_name}</div>
                    <div className="w-full md:w-1/3 md:text-center" >Quantity: {e.quantity}</div>
                    <div className="w-full md:w-1/3 md:text-right mr-2" >Price: ${e.unit_retail}</div>
                </div>
            </>);
        });

    return (
        <>
            <div>
                <div className="flex w-full"> {page_title} </div>
                <div className="block justify-center">
                    <div className="text-lg text-center mt-4">An email with your order number and summary of purchase has been sent to {email}.</div>
                    <div className="text-lg text-center mb-4">Thank you for shopping with us! We are continuosly working to better serve you! </div>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-full md:w-2/3 border border-orange-400 ">
                        <div className="flex justify-center text-3xl font-extrabold m-4">Order Summary</div>
                        <div className="hidden md:flex justify-center">
                            <div className="w-1/2 ml-2 font-bold mt-2">Total items: {totalItem} </div>
                            <div className="w-1/2 text-right mr-2 font-bold mt-2">Your Total Cost: ${totalCost} </div>
                        </div>
                        <div>{ListItem}</div>
                        <div className="block md:hidden">
                            <div className="md:w-1/2 md:ml-2 font-bold mt-2 mr-2 text-right md:text-left">Total items: {totalItem} </div>
                            <div className="md:w-1/2 text-right font-bold mr-2 mt-2">Your Total Cost: ${totalCost} </div>
                        </div>
                        <div className="text-center font-extrabold text-xl mt-4 md:my-0 md:mt-8">Thank you for your purchase!</div>
                        <div className="flex justify-center">
                            <div className="ml-2 md:ml-0 underline text-sm mb-4">Order#: {offerID}</div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


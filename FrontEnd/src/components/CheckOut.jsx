import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Collapse } from 'react-collapse';
import FireBaseSetup from '../FireBaseSetup';
import { CartItemCheckOut } from './CartItem';
import {loader, CountCart } from '../ListOfLinks';

export const CheckOut = () => {
    const [email,setEmail] = useState("");
    const [ItemArray, setItemArray] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalcost, setTotalCost] = useState(0);
    const [/*UserUID*/, setUserUID] = useState("");
    const [userToken, setUserToken] = useState("");
    const [isOpenS, setIsOpenS] = useState(true);
    var ToTalAllCart = 0;
    useEffect(() => {
        document.title = `CheckOut`;
        FireBaseSetup.isInitialized().then(user => {
            if (user) {
                user.getIdToken().then(function (idToken) {
                    setUserToken(idToken);
                    fetching(user.email);
                    setEmail(user.email);

                });
                setUserUID(user.uid);
                setLoad(true);
            }
        });
    }, [])

    const fetching = async (e) => {

        await axios.post(CountCart, { email: e }).then((res) => {
            //console.log(res.data);
            for (var i of res.data) {
         
                ToTalAllCart += parseFloat(i.total_cost);
            }
            setTotalCost((Math.round(ToTalAllCart * 100) / 100).toFixed(2));
            setItemArray(res.data);

        }).catch((err) => { });
    }

    const PlaceOrderApi = async () => {
        var time = Date(Date.now()).toString();
        var invoiceObj = {
            itemArray : ItemArray,
            time: time,
            totalCost: totalcost,
            offerNumber: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }
      
        console.log(invoiceObj);
        axios.post("http://localhost:3001/confirmation",           
            { invoiceObj, email: email }).then(() => {
                axios.post("http://localhost:3001/emptycart", { email: email });


                window.location.assign('/confirmation')
            });

    }

    const ListItem =
        ItemArray.map(e => {
            return (<>
                <br />
                <CartItemCheckOut value={e} token={userToken} />
            </>);
        });

    return (<>
        <div className="w-full block">
            <div className=" titlePage pt-4 lg:text-3xl"> Check Out</div>
            <div className="w-full md:w-1/3 md:float-right ">
                <div className="text-md md:text-xl font-extrabold text-center md:text-right py-4">Your Total Price: ${totalcost}</div>
                <div className="pb-4 m-2 md:m-0 md:float-right">
                    <button onClick={PlaceOrderApi} className="w-full h-12 md:w-64 rounded border border-orange-500 text-base font-bold" >Place Order</button>
                </div>
                <hr className="md:hidden m-2 pb-1 px-4 bg-orange-500" />
            </div>
            <div className="w-full md:w-2/3">
                <div className="text-lg pl-2 md:text-2xl w-1/2">Shipping Address</div>

                <div className="text-sm pr-2 underline text-right">Change</div>

                <hr className="m-2 pb-1 px-4 bg-orange-500" />
                <div className="text-lg pl-2 md:text-2xl w-1/2">Payment Method</div>
                <hr className="m-2 pb-1 px-4 bg-orange-500" />
                <div >
                    <div className="text-base md:text-xl pt-4 pl-2">Name on the Card</div>
                    <input id="cardname" className="m-2 rounded border border-gray-600 h-10 px-5 pr-8 text-sm w-70 " type="search" name="search"></input>
                    <div className="text-base md:text-xl pt-4 pl-2">Card Number</div>
                    <input id="cardname" className="m-2 rounded border border-gray-600 h-10 px-5 pr-8 text-sm w-70 " type="search" name="search"></input>
                    <div className="text-base md:text-xl pt-4 px-2 block md:w-1/3 md:flex">Expirantion Date MM/YY</div>
                    <input id="cardname" className="m-2 block md:flex rounded border border-gray-600 h-10 px-5 pr-8 text-sm w-70 " type="search" name="search"></input>
                    <div className="text-base md:text-xl pt-4 pl-2 block md:flex">CSV</div>
                    <input id="cardname" className="m-2 block md:flex rounded border border-gray-600 h-10 px-5 pr-8 text-sm w-70 " type="search" name="search"></input>
                </div>
            </div>
            <div onClick={() => setIsOpenS(!isOpenS)} className="text-lg pl-2 pt-4 md:text-2xl w-1/2 cursor-pointer hover:text-orange-500">Order Review</div>
            <hr className="m-2 pb-1 px-4 bg-orange-500" />
            <Collapse isOpened={isOpenS}>
                {load ? ListItem : loader}
                <hr /><hr />
            </Collapse>
            <div className="text-md md:text-xl font-extrabold text-center md:text-right py-4">Your Total Price: ${totalcost}</div>
            <div className="pb-4 m-2 md:m-0 md:float-right">
                <button onClick={PlaceOrderApi} className="w-full h-12 md:w-64 rounded border border-orange-500 text-base font-bold" >Place Order</button>
            </div>
        </div>


    </>)
}
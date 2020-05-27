import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FireBaseSetup from '../FireBaseSetup';
import { CartItem } from './CartItem';
import { loader, CountCart } from '../ListOfLinks';
import { PortConnectToBackEnd } from '..';


export const Cart = (props) => {
    const [/*UserUID*/, setUserUID] = useState("");
    const [email, setEmail] = useState('');
    const [ItemArray, setItemArray] = useState([]);
    const [load, setLoad] = useState(false);
    const [totalcost, setTotalCost] = useState(0);
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        document.title = `My Cart`;
        FireBaseSetup.isInitialized().then(user => {
            if (user) {
                user.getIdToken().then(function (idToken) {
                    setUserToken(idToken);
                    setEmail(user.email);
                    fetching(user.email);
                });
                setUserUID(user.uid);
                setLoad(true);
            }

        });
    }, []);
    const fetching = async (e) => {
        var ToTalAllCart = 0;
        await axios.post(CountCart, { email: e }).then((res) => {
          
            for (var i of res.data) {
                console.log(i.total_cost);
                ToTalAllCart += parseFloat(i.total_cost);
            }
            setTotalCost((Math.round(ToTalAllCart * 100) / 100).toFixed(2));
            setItemArray(res.data);
        }).catch((e) => { window.location.href = '/'; });
    };
    const ListItem =
        ItemArray.map(e => {
            
            return (<>
                <br />
                <CartItem value={e} token={userToken} email={email} />
            </>);
        });
    const container = (
        <div>
            <div className="mt-4 justify-center w-full">
                <div className="titlePage py-2 lg:text-3xl"> My Cart </div>
            </div>
            <div className="md:hidden w-full justify-center">
                <div className="text-xl font-bold m-4 text-center">Your Total Price: ${totalcost}</div>
                <button onClick={() => { window.location.href = '/checkout' }} className="justify-center h-12 w-full border rounded border-orange-500 px-5 font-bold">Go To Check Out</button>
            </div>
            <div className="block md:flex">
                <div className=" w-full md:w-2/3">
                    {ListItem}
                </div>
                <div className="w-full md:w-1/3 md:mx-8 my-8 ">
                    <div className="hidden md:flex text-xl font-bold text-center float-right">Your Total Price: ${totalcost}</div>
                    <button onClick={() => { window.location.href = '/checkout' }} className="w-full float-right h-12 md:w-64 rounded border border-orange-500 text-base font-bold">Check Out</button>
                </div>
            </div>
        </div>);

    return (<>
        {load ? container : loader}
    </>);
}

import React, { useEffect, useState } from 'react';
import '../css/mainTailwind.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { GetVendors, loader } from '../ListOfLinks';
import pic1 from '../Pics/image15.jpg';
import pic2 from '../Pics/image16.jpg';
import { Carousel } from "react-responsive-carousel";
import { PortConnectToBackEnd } from '..';
export const Vendors = () => {
    let { idv } = useParams();
    
    var initValue = [];
    const [supplier, setSupplier] = useState([]);
    const [/*totalVendor*/, setTotalVendor] = useState(0);
    const [load, setLoad] = useState(false);
    const [productName, setProductName] = useState('');

    useEffect(() => {
        document.title = `Home Depot - Vendor`;
        fetching(idv);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [load]);
    const fetching = async (idv) => {
        await axios.get("http://localhost:" + PortConnectToBackEnd + "/vendors/" + idv).then((res) => {
            console.log(res);
            setTotalVendor(res.data.length);
            setProductName(res.data[0].Product_name);
            for (var i = 0; i < res.data.length; i++) {
                initValue.push({ supplier: res.data[i].Supplier_name, supplier_key: res.data[i].supplier_key, unit_retail: (Math.round(res.data[i].Unit_retail * 100) / 100).toFixed(2), offering_key: res.data[i].offeringID });
            }
            setSupplier(initValue);

        })
        setLoad(true);
    }
    const ListVendor =
        supplier.map((e, i) => {
            return (<>
                <VendorEach value={e} index={i} />
            </>);
        });

    const page_title = (
        <div className="mt-4 justify-center w-full h-auto md:h-auto">
            <div className=" titlePage py-2 lg:text-3xl"> Other Vendors </div>
        </div>
    );

    const side_pic = (

        <div>
            <div className="justify-center flex md:px-5 lg:px-0">
                <Carousel axis="horizontal" showThumbs={true} showArrows={true} >
                    <img src={pic1} alt="pic1" />
                    <img src={pic2} alt="pic2" />
                </Carousel>
            </div>

        </div>
    );

    const prodc_name = (
        <div className="mb-20 flex ">
            <div className="text-2xl font-bold "> {productName}</div>
        </div>
    );

    const container = (
        <div>
            <div>{page_title}</div>

            <div className="block md:flex w-full md:m-4">

                <div className="w-full md:w-1/2 md:m-4">
                    <div className="mt-4 lg:ml-0 underline">{prodc_name}</div>
                    <div>{side_pic}</div>
                </div>

                <div className="flex md:block w-full md:w-1/3 md:m-4">
                    <table className="table-auto border-2 border-orange-500 float-right">

                        <thead>
                            <tr>
                                <th className="p-4 border-r-2 border-orange-500 underline text-lg md:text-xl">  Logo </th>
                                <th className="p-4 border-r-2 border-l-2 border-orange-500 underline text-lg md:text-xl"> Vendor </th>
                                <th className="p-4 border-r-2 border-orange-500 underline text-lg md:text-xl">  Unit Retail  </th>

                            </tr>
                        </thead>

                        <tbody>
                            {ListVendor}
                        </tbody>

                    </table>
                </div>


            </div>
        </div>
    )
    return (<>
        <div>
            <br />

            <div> {load ? container : null}</div>
           
            <br />

        </div>

    </>);
}

const VendorEach = (props) => {

    var imgStr = "https://generative-placeholders.glitch.me/image?width=50&height=50&img=".concat(props.index);
    var imgStr2 = "https://generative-placeholders.glitch.me/image?width=50&height=50&img=".concat(100 + props.index);

    const grayline = (<>
        <td onClick={() => { window.location.href = '/supplier/' + props.value.supplier_key }} className="pl-2 border-2 border-orange-500 cursor-pointer"> <img src={imgStr} alt="imgStr" /></td>
        <td onClick={() => { window.location.href = '/supplier/' + props.value.supplier_key }} className="p-2 border-2 border-orange-500 text-center cursor-pointer hover:underline hover:font-bold bg-gray-300" >{props.value.supplier}</td>
        <td onClick={() => { window.location.href = '/offering/' + props.value.offering_key }} className="p-2 border-2 border-orange-500 text-right bg-gray-300 cursor-pointer hover:underline hover:font-bold"  >${props.value.unit_retail}</td>
    </>)
    const whiteline = (<>
        <td onClick={() => { window.location.href = '/supplier/' + props.value.supplier_key }} className="pl-2 border-2 border-orange-500 cursor-pointer"><img src={imgStr2} alt="imgStr" /></td>
        <td onClick={() => { window.location.href = '/supplier/' + props.value.supplier_key }} className="p-2 border-2 border-orange-500 text-center cursor-pointer hover:underline hover:font-bold bg-white" >{props.value.supplier}</td>
        <td onClick={() => { window.location.href = '/offering/' + props.value.offering_key }} className="p-2 border-2 border-orange-500 text-right bg-white cursor-pointer hover:underline hover:font-bold" >${props.value.unit_retail}</td>
    </>)

    return (
        <tr>{(props.index % 2 === 0) ? grayline : whiteline}
        </tr>
    )
}
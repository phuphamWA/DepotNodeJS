import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { Carousel } from "react-responsive-carousel";
import tool1 from '../Pics/tool1.jpg';
import tool2 from '../Pics/tool2.jpg';
import { GetHomeRandom, loader } from '../ListOfLinks';

export const searchbar = (
    <div className="  mt-4 justify-center flex text-gray-600 w-full">
        <input className=" rounded border-2 border-orange-500 bg-white h-15 px-5 pr-8 text-sm w-full" type="search" name="search" placeholder="Search"></input>
        <button type="submit" className="px-4 py-2 border-2 rounded text-gray-300 border-orange-500 bg-white hover:text-white hover:border-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="15"><path className="heroicon-ui " fill="gray" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" /></svg>
        </button>
    </div>);

export var displayRandom = () => {
    var rand = Math.floor(Math.random() * 100);
    var imgStr = "https://generative-placeholders.glitch.me/image?width=500&height=500&img=".concat(rand);
    return (<><img src={imgStr} alt="imgStr" /></>);
}

export const Home = (props) => {
    var initValue = [];
    const [AdItems, setAdItems] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        document.title = `Home Depot - HomePage`;

        const tryFetch = async () => {
            await axios.get(GetHomeRandom).then((res) => {
               // console.log(res);
                for (var i = 0; i < res.data.length; i++) {
                    initValue.push({ id: res.data[i].id, product_name: res.data[i].product_name, price: res.data[i].retail });
                //    console.log(res.data[i]);
                }
                setAdItems(initValue);
                setLoad(true);
            })
        }
        tryFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const carousel_slide = (
        <div className="flex justify-center w-full">
            <div className="justify-center flex">
                <Carousel axis="horizontal" showThumbs={true} showArrows={true} >
                    <img src={tool2} alt="tool2" />
                    <img src={tool1} alt="tool1" />
                </Carousel>
            </div>
        </div>
    );

    const checkDiscount = (discount, normal) => {
        if (discount === null)
            return (<div>${normal}</div>);
        else
            return (
                <div className="block">
                    <div className="text-gray-400 font-bold line-through">${normal}</div>
                    <div className="text-black font-bold">${discount}</div>
                </div>
            );
    }

    function swiping() {
        return (
            <div><SwipeableViews enableMouseEvents>
                <div className="flex w-full   ">
                    <div className="w-full md:w-1/5 border-2 border-double border-orange-600 rounded  ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[0].id}>
                            <div className="hover:font-bold hover:bg-orange-500 xl:text-xl">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[0].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex"> ${load === false ? null : AdItems[0].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/5 border-2 border-orange-600 rounded ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[1].id}>
                            <div className="hover:font-bold hover:bg-orange-500 xl:text-xl">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[1].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex"> ${load === false ? null : AdItems[1].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/5 border-2 border-orange-600 rounded  ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[2].id}>
                            <div className="hover:font-bold hover:bg-orange-500 xl:text-xl">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[2].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex"> ${load === false ? null : AdItems[2].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/5 border-2 border-orange-600 rounded ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[3].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[3].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex"> ${load === false ? null : AdItems[3].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-full md:w-1/5 border-2 border-orange-600 rounded ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[4].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[4].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex"> ${load === false ? null : AdItems[4].price} </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex w-full  ">
                    <div className="  border-2 border-orange-600 rounded  w-1/2 md:w-1/5 ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[5].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[5].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[5].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="  border-2 border-orange-600 rounded w-1/2 md:w-1/5 ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[6].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[6].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[6].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="  border-2 border-orange-600 rounded  hidden ti:block md:w-1/5 ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[7].id}>
                            <div className="hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[7].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[7].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="   hidden md:block md:w-1/5 border-2 border-orange-600 rounded">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[8].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[8].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[8].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="   border-2 border-orange-600 rounded hidden md:block md:w-1/5 ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[9].id}>
                            <div className="  hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[9].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[9].price} </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex w-full  ">
                    <div className="   w-1/2 md:w-1/5 border-2 border-orange-600 rounded">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[10].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[10].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[10].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="  w-1/2 md:w-1/5  border-2 border-orange-600 rounded">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[11].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[11].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[11].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="    hidden ti:block md:w-1/5 border-2 border-orange-600 rounded ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[12].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[12].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[12].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="   hidden md:block md:w-1/5 border-2 border-orange-600 rounded ">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[13].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[13].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[13].price} </div>
                            </div>
                        </Link>
                    </div>
                    <div className="    hidden md:block md:w-1/5 border-2 border-orange-600 rounded">
                        <div> {displayRandom()} </div>
                        <Link to={load === false ? loader : '/offer/' + AdItems[14].id}>
                            <div className=" hover:font-bold hover:bg-orange-500 xl:text-xl ">
                                <div className=" text-black md:pt-4 pl-4">{load === false ? null : AdItems[14].product_name}</div>
                                <div className="text-black pt-2 md:pt-4 pl-4 md:pt-8 flex">${load === false ? null : AdItems[14].price} </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </SwipeableViews> </div>
        )
    }
    // );

    return (
        <div>
            {searchbar}
            <br />
            {carousel_slide}
            <div className="w-full">
                <div className="font-extrabold text-xl">Trending Now</div>
                <hr className="m-1 pt-1 px-4 bg-orange-400" />
                {swiping()}

                <div className="font-extrabold text-xl md:pt-4">Deals</div>
                <hr className="m-1 pt-1 px-4 bg-orange-400" />
                <div>{swiping()}</div>

                <div className="font-extrabold text-xl md:pt-4">Popular</div>
                <hr className="m-1 pt-1 px-4 bg-orange-400" />
                {swiping()}
                <div className="md:py-4"></div>
            </div>
        </div>
    );
}

import React from 'react';
import './css/loader/three-dot.css';

const env = 'http://nodejs-env.eba-wmtkyt58.us-west-2.elasticbeanstalk.com';
export const GetBrowsingPage = env + "/leastretail";
export const BrowsingPageSpecific = (sortPrice, number, location) => {
    return env + "/sortprice/" + sortPrice + "/item/" + number + "/page/" + location;
}
export const BrowsingPageSpecificLeast = (number, location) => {
    return env + "/leastretail/item/" +number + "/page/" + location;
} 
//export const GetHomeRandom = env + "/catalog-api/products/home";
export const GetHomeRandom = env + "/randomitem";

export const ProductPage = (offerID) => {
    return env + "/products/" + offerID;
} 
export const CartAdding = env + "/cartadding";
export const CountCart = env + "/countcart";
export const ClickConfirm = env + "/confirmation";
export const EmptyCart = env + "/emptycart";
export const UpdateCart = env + "/updatecart";
export const RemoveCart = env + "/removecart";
/*export const TokenHeader = (tokenID) => {
    var config = {
        headers: {
            'Authorization': 'Bearer '.concat(tokenID)
        }
    }
    return config;
}
*/
export const loader = (<><div className="dot-spin" /></>)
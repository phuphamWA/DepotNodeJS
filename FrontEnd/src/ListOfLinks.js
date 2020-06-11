import React from 'react';
import './css/loader/three-dot.css';

const env = 'http://ec2-54-244-76-83.us-west-2.compute.amazonaws.com:3000';
export const GetBrowsingPage = env + "/leastretail";
export const BrowsingPageSpecific = (sortPrice, number, location) => {
    return env + "/sortprice/" + sortPrice + "/item/" + number + "/page/" + location;
}
export const BrowsingPageSpecificLeast = (number, location) => {
    return env + "/leastretail/item/" +number + "/page/" + location;
} 

export const GetHomeRandom = env + "/randomitem";

export const ProductPage = (offerID) => {
    return env + "/products/" + offerID;
} 
export const CartAdding = env + "/cartadding";
export const CountCart = env + "/countcart";
export const ClickConfirm = env + "/confirmation";
export const EmptyCart = env + "/emptycart";
export const UpdateCartt = env + "/updatecart";
export const RemoveCart = env + "/removecart";

export const PurchaseHistory = env + "/purchasehistory";
export const ManageUser = env + "/user";
export const InsertUser = env + "/insert-user";
export const PostUser = env + "/post-user";

export const OtherVendorPage = (idv) => {
    return env + "/vendors/" + idv;
} 
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
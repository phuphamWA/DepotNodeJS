var MongoClient = require('mongodb').MongoClient;

var properties = require('../package.json');
var url = "mongodb+srv://gum:Gumgum123@cluster0-ycsux.azure.mongodb.net/test?retryWrites=true&w=majority";


var LeastRetail;
var Vendors;
var TotalItem;


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("HomeDepot");
    var queryAll = {};
    dbo.collection("OfferingOne").find(queryAll).toArray(function (err, result) {
        if (err) throw err;
        LeastRetail = result;
        for (var l = 0; l < LeastRetail.length; l++) {
            if (LeastRetail[l].product_name === null) { LeastRetail[l] = LeastRetail[l - 1]; }
            LeastRetail[l].product_name = replacing(LeastRetail[l].product_name);
            LeastRetail[l].long_description = replacing(LeastRetail[l].long_description);
            LeastRetail[l].Supplier_name = replacing(LeastRetail[l].Supplier_name);
        }
        TotalItem = LeastRetail.length - 1;
        db.close();
    });
});

const roundNumber = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};
const sortingPriceFunction = (array, option) => {
    var newArray = [];
    if (option === "priceUp")
        newArray = array.sort((a, b) => { return (a.unit_retail - b.unit_retail); });
    else if (option === "priceDown") 
        newArray = array.sort((a, b) => { return (b.unit_retail - a.unit_retail); });
    else if (option === "alphabetUp")
        newArray = array.sort((a, b) => {
            if (a.product_name > b.product_name)
                return 1;
            if (a.product_name < b.product_name)
                return -1;
            return 0;
        });
    return (newArray);
};
const ReqResInBrowsing = (request, array) => {
 /*   console.log(request.params.item);
    console.log(request.params.pageNumber);*/
    var PageNeed = Math.round(TotalItem / request.params.item);
    var startingpoint = request.params.item * (request.params.pageNumber - 1);
    var endpoint = request.params.item * request.params.pageNumber;
    if (endpoint > array.length - 1)
        endpoint = array.length - 1;
    else
        endpoint = request.params.item * request.params.pageNumber;
    console.log("startingpoint:", startingpoint, " end:", endpoint);
    var productInfo = [];
    var restProduct = [];
    if (request.params.pageNumber === PageNeed) {
        for (var o = startingpoint; o < TotalItem; o++) {
            //     if (LeastRetail[i*req.params.pageNumber-1].id === "") { break; }
            restProduct.push({
                offerID: array[o].offeringID,
                product_key: array[o].product_key,
                product_name: array[o].product_name,
                description: array[o].long_description,
                retail: array[o].unit_retail
            });
        }

        return (restProduct);
    }
    else if (request.params.pageNumber > PageNeed) {
        res.send("Error! Nothing here");
        return;
    }
    else {
        for (var i = startingpoint; i < endpoint; i++) {
            productInfo.push({
                offerID:array[i].offeringID,
                product_key: array[i].product_key,
                product_name: array[i].product_name,
                description: array[i].long_description,
                retail: array[i].unit_retail
            });

        }
        return (productInfo);
    }
};
var replacing = (str) => {
    str = str.substring(1, str.length - 1);
    return str;
};

const randomItem = (req,res) => {
    var productInfo = [];
    for (var i = 0; i < 15; i++) {
        let r = Math.floor(Math.random() * LeastRetail.length);
        console.log(LeastRetail[r]);
        productInfo.push({
            id: LeastRetail[r].id,
            product_name: LeastRetail[r].product_name,
            description: LeastRetail[r].long_description,
            retail: roundNumber(LeastRetail[r].unit_retail)

        });
    }
    res.send(productInfo);
};

var controllers = {
    home: function (req, res) { res.send("Welcome Backend Api"); },
    about: function (req, res) {
        var aboutInfo = {
            name: properties.name,
            version: properties.version
        };
        res.send(aboutInfo);
    },
    leastRetail: function (req, res) {
        var productInfo = [];
        for (var i = 0; i < LeastRetail.length; i++) {
            if (LeastRetail[i].id === "") { break; }
            productInfo.push({
                offerID: LeastRetail[i].offeringID,
                product_key: LeastRetail[i].product_key,
                product_name: LeastRetail[i].product_name,
                description: LeastRetail[i].long_description,
                retail: LeastRetail[i].unit_retail
            });
        }
        console.log(productInfo);
        res.send(productInfo);
    },
    leastRetail2: function (req, res) {
        // res.send(req.params);   ////http://localhost:3001/leastretail/item/15/page/7
        res.send(ReqResInBrowsing(req, sortingPriceFunction(LeastRetail, "alphabetUp")));
    },
    sortPriceUp: function (req, res) {
        res.send(ReqResInBrowsing(req, sortingPriceFunction(LeastRetail, "priceUp")));
    },
    sortPriceDown: function (req, res) {
        res.send(ReqResInBrowsing(req, sortingPriceFunction(LeastRetail, "priceDown")));
    },
    productPage: function (req, res) {
        console.log(req.params.id);
        let obj = LeastRetail.find(x => x.offeringID === req.params.id);
        console.log(obj);
        res.send(obj);
    },
    vendorPage: function (req, res) {

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("HomeDepot");
            var query = { "product_key": req.params.id };
            dbo.collection("Vendors").find(query).toArray(function (err, result) {
                Vendors = result;
                for (var i = 0; i < Vendors.length; i++) {
                    if (Vendors[i].Supplier_name === null) { Vendors[i] = Vendors[i - 1]; }
                    Vendors[i].Supplier_name = replacing(Vendors[i].Supplier_name);
                }

                //  console.log(result);
            });
        });
        res.send(Vendors);
    },
    randomItem: randomItem,
    postuser: function (req, res) {
        // console.log(req.body);
        //mongoUpdating(req.body.id, req.body.objName, req.body.objEmailAddress, req.body.objAddress, req.body.objPhone);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log(req.body.id);
            var dbo = db.db("HomeDepot");
            var query = { uid: req.body.id };
            console.log(query);
            var newvalues = {
                $set: {

                    full_name: { first_name: req.body.objFirstName, middle_name: req.body.objMiddleName, last_name: req.body.objLastName },
                    first_address: { street: req.body.objStreet1, apt: req.body.objapt1, city: req.body.objCity1, state: req.body.objState1, zip_code: req.body.objZipcode1 },
                    second_address: { street: req.body.objStreet2, apt: req.body.objapt2, city: req.body.objCity2, state: req.body.objState2, zip_code: req.body.objZipcode2 },
                    phone_number: {
                        primary_phone: { phone: req.body.objPhone1, ext: req.body.objExt1 }, secondary_phone: { phone: req.body.objPhone2, ext: req.body.objExt2 }
                    }
                }
            };
            dbo.collection("UserDetail").updateOne(query, newvalues, function (err, result) {
                if (err) throw err;
                console.log("Document updated");
                db.close();
            });
        });
        res.json({ success: true });
    },
    user: function (req, res) {
        var info;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("HomeDepot");
            var queryAll = {};
            dbo.collection("UserDetail").find(queryAll).toArray(function (err, result) {

                if (err) throw err;
                info = result;

                res.send(info);
                db.close();
            });
        });

    },
    newuser: function (req, res) {
        console.log(req.body.id);
        console.log(req.body.email);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("HomeDepot");
            console.log(req);
            var query = {
                uid: req.body.id, email: req.body.email,
                full_name: { first_name: " ", middle_name: " ", last_name: " " },
                first_address: { street: " ", apt: " ", city: " ", state: " ", zip_code: " " },
                second_address: { street: " ", apt: " ", city: " ", state: " ", zip_code: " " },
                phone_number: {
                    primary_phone: { phone: " ", ext: " " }, secondary_phone: { phone: " ", ext: " " }
                },
                cart: 0 // new things
            };
            dbo.collection("UserDetail").insertOne(query, function (err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
        res.json({ success: true });
    }

};
module.exports = controllers;


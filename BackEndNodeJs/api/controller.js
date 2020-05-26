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
const confirmation = (req, res) => {
    console.log(req.body.invoiceObj);
    var query = { email: req.body.email  };
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("HomeDepot");
        dbo.collection("UserDetail").update(query, {
            $push: {
                historypurchases: req.body.invoiceObj
            }
        });
        res.send("Done");
    });
};
const purchasehistory = (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var query = { email: req.body.email };
        var dbo = db.db("HomeDepot");
        dbo.collection("UserDetail").findOne(query).then(result => {
            res.send(result.historypurchases);
        });
 
    });
}
const randomItem = (req,res) => {
    var productInfo = [];
    for (var i = 0; i < 15; i++) {
        let r = Math.floor(Math.random() * LeastRetail.length);
        //console.log(LeastRetail[r]);
        productInfo.push({
            id: LeastRetail[r].offeringID,
            product_name: LeastRetail[r].product_name,
            description: LeastRetail[r].long_description,
            retail: roundNumber(LeastRetail[r].unit_retail)

        });
    }
    res.send(productInfo);
};
const cartAdding = (req, res) => {

    var query = { email: req.body[0].email };
    let newPrice, newQuanity, temp, newvalues;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("HomeDepot");  
        dbo.collection("UserDetail").findOne(query).then(result => {

            if (result.cartdb.length === 0) {
                newvalues = {
                    $push: {
                        cartdb: {
                            product_name: req.body[0].product_name,
                            product_key: req.body[0].product_key,
                            unit_retail: req.body[0].unit_retail,
                            quantity: req.body[0].quantity,

                            supplier_name: req.body[0].supplier_name,
                            supplier_key: req.body[0].supplier_key,
                            offering_key: req.body[0].offering_key,
                            total_cost: (Math.round(parseFloat(req.body[0].quantity) * parseFloat(req.body[0].unit_retail) * 100) / 100).toFixed(2),
                            time: Date(Date.now()).toString()
                        }
                    }
                };

            }
            else {
                temp = result.cartdb;

                temp.forEach(e => {
                    if (e.offering_key === req.body[0].offering_key) {
                        newPrice = parseFloat(e.unit_retail) + parseFloat(req.body[0].unit_retail) * req.body[0].quantity;
                        newQuanity = e.quantity + req.body[0].quantity;
                        newvalues = {
                            $set: {
                                "cartdb.$[]": {
                                    product_name: req.body[0].product_name,
                                    product_key: req.body[0].product_key,
                                    unit_retail: (Math.round(newPrice * 100) / 100).toFixed(2),
                                    quantity: newQuanity,

                                    supplier_name: req.body[0].supplier_name,
                                    supplier_key: req.body[0].supplier_key,
                                    offering_key: req.body[0].offering_key,
                                   
                                    total_cost: (Math.round(newPrice * parseFloat(newQuanity) * 100) / 100).toFixed(2),
                                    time: Date(Date.now()).toString()
                                }
                            }
                        };
                    }
                    else {
                        newvalues = {

                            $push: {
                                cartdb: {
                                    product_name: req.body[0].product_name,
                                    product_key: req.body[0].product_key,
                                    unit_retail: req.body[0].unit_retail,
                                    quantity: req.body[0].quantity,

                                    supplier_name: req.body[0].supplier_name,
                                    supplier_key: req.body[0].supplier_key,
                                    offering_key: req.body[0].offering_key,
                                    total_cost: (Math.round(parseFloat(req.body[0].quantity) * parseFloat(req.body[0].unit_retail) * 100) / 100).toFixed(2),
                                    time: Date(Date.now()).toString()
                                }
                            }
                        };
                    }

                });
            }
       //     console.log(newvalues);
            dbo.collection("UserDetail").updateOne(query, newvalues);
            db.close();
        });
    });
    res.send(req.body);
};
const countCart = (req, res) => {
    var query = { email: req.body.email };
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
 
        var dbo = db.db("HomeDepot");
        dbo.collection("UserDetail").findOne(query).then(result => {
             res.send(result.cartdb);
        });

    });
   
};     
const upCart = (req, res) => {
    console.log(req.body);
    var query = { email: req.body.email, "cartdb.offering_key": req.body.propsOne  };
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
       
        var dbo = db.db("HomeDepot");
        dbo.collection("UserDetail").update(query, {
            $set: {
                "cartdb.$.quantity": req.body.quantity,
                "cartdb.$.total_cost": req.body.totalCost
            }
        });
      
    });
    res.send("Cart Updated");
};
const removeCart = (req, res) => {
    //console.log(req.body);
    var query = { email: req.body.email};
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("HomeDepot");
        dbo.collection("UserDetail").update(query, {
            $pull: {
                'cartdb': {
                    offering_key:req.body.propsOne
                } 
        }
        });

    });
};
const emptycart = (req, res) => {
    var query = { email: req.body.email };
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("HomeDepot");
        dbo.collection("UserDetail").update(query, {
            $set: {
                cartdb: []
            }
        });

    });
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
      //  console.log(productInfo);
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
      //  console.log(req.params.id);
        let obj = LeastRetail.find(x => x.offeringID === req.params.id);
    //    console.log(obj);
        res.send(obj);
    },
    vendorPage: function (req, res) {
        console.log("hi");
        console.log(req.body);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
           
           
            var dbo = db.db("HomeDepot");
            var query = { "product_key": req.params.id };
            dbo.collection("SupplierAll").find(query).toArray(function (err, result) {
                Vendors = result;
                for (var i = 0; i < Vendors.length; i++) {
                    if (Vendors[i].Supplier_name === null) { Vendors[i] = Vendors[i - 1]; }
                    Vendors[i].Supplier_name = replacing(Vendors[i].Supplier_name);
                }

                res.send(Vendors);
            });
        });
        
    },
    randomItem: randomItem,
    postuser: function (req, res) {
        
        //mongoUpdating(req.body.id, req.body.objName, req.body.objEmailAddress, req.body.objAddress, req.body.objPhone);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log("body",req.body);
            var dbo = db.db("HomeDepot");
            var query = { email: req.body.objEmail };
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
                cartNumber: 0, // new things
                cartdb: [],
                historypurchases:[]
            };
            dbo.collection("UserDetail").insertOne(query, function (err, result) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
        res.json({ success: true });
    },
    cartAdding: cartAdding,
    countCart: countCart,
    upCart: upCart,
    confirmation: confirmation,
    removecart: removeCart,
    purchasehistory: purchasehistory,
    emptycart: emptycart
};
module.exports = controllers;


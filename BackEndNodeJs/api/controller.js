var MongoClient = require('mongodb').MongoClient;

var properties = require('../package.json');
var url = "mongodb+srv://gum:Gumgum123@cluster0-ycsux.azure.mongodb.net/test?retryWrites=true&w=majority";


var LeastRetail;
var TotalItem;
var sortListPriceUp;
var sortListPriceDown;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("HomeDepot");
    var queryAll = {};
    dbo.collection("LeastPrice").find(queryAll).toArray(function (err, result) {
        if (err) throw err;
        LeastRetail = result;
        for (var l = 0; l < LeastRetail.length; l++) {
            if (LeastRetail[l].product_name === null) { LeastRetail[l] = LeastRetail[l - 1]; break; }
            LeastRetail[l].product_name = replacing(LeastRetail[l].product_name);
            LeastRetail[l].long_description = replacing(LeastRetail[l].long_description);
            LeastRetail[l].Supplier_name = replacing(LeastRetail[l].Supplier_name);
        }
     
        TotalItem = LeastRetail.length-1;
        db.close();
    });

});
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
    console.log(request.params.item);
    console.log(request.params.pageNumber);
    var PageNeed = Math.round(TotalItem / request.params.item);
    var startingpoint = request.params.item * (request.params.pageNumber - 1);
    var endpoint = request.params.item * request.params.pageNumber;
    var productInfo = [];
    var restProduct = [];
    if (request.params.pageNumber == PageNeed) {
        for (var o = startingpoint; o < TotalItem; o++) {
            //     if (LeastRetail[i*req.params.pageNumber-1].id === "") { break; }
            restProduct.push({
                id: array[o].id,
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
                id: array[i].id,
                product_name: array[i].product_name,
                description: array[i].long_description,
                retail: array[i].unit_retail
            });

        }
        return (productInfo);
    }
}
var replacing = (str) => {
    str = str.substring(1, str.length - 1);
    return str;
};

var controllers = {
    home: function (req, res) { res.send("Welcome Backend Api");},
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
                id: LeastRetail[i].id,
                product_name: LeastRetail[i].product_name,
                description: LeastRetail[i].long_description,
                retail: LeastRetail[i].unit_retail
            });
      //      console.log(productInfo);
        }
        for (var x = 0; x < productInfo.length; x++) {
            if (productInfo[x].product_name === null) { break; }
            productInfo[x].product_name = replacing(productInfo[x].product_name);
            productInfo[x].description = replacing(productInfo[x].description);
        }
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
        let obj = LeastRetail.find(x => x.id === req.params.id);
        res.send(obj);
    }
}
module.exports = controllers;


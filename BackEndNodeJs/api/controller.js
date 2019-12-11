var MongoClient = require('mongodb').MongoClient;

var properties = require('../package.json');
var url = "mongodb+srv://gum:Gumgum123@cluster0-ycsux.azure.mongodb.net/test?retryWrites=true&w=majority";


var LeastRetail;
var TotalItem;
var options = [5, 10, 15, 20];
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("HomeDepot");
    var queryAll = {};
    dbo.collection("LeastRetail").find(queryAll).toArray(function (err, result) {
        if (err) throw err;
        LeastRetail = result;
        TotalItem = LeastRetail.length-1;
        db.close();
    });
});
var replacing = (str) => {
    str = str.substring(1, str.length - 1);
    return str;
};
var controllers = {
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
            if (LeastRetail[i].id === "") { break;}
            productInfo.push({
                id: LeastRetail[i].id,
                product_name: LeastRetail[i].product_name,
                description: LeastRetail[i].long_description,
                retail: LeastRetail[i].Unit_retail
            });
          
        }
        for (var x = 0; x < productInfo.length; x++) {
            if (productInfo[x].product_name === null) { break; }
            productInfo[x].product_name = replacing(productInfo[x].product_name);
            productInfo[x].description = replacing(productInfo[x].description);
        }
        res.send(productInfo);
    },
    leastRetail2: function (req, res) {
        // res.send(req.params);   ////http://localhost:3001/leastretail/15/page/7
        console.log(req.params.item);
        console.log(req.params.pageNumber);
        console.log(TotalItem);
        var PageNeed = Math.round(TotalItem / req.params.item);
        var startingpoint = req.params.item * (req.params.pageNumber - 1);
        var endpoint = req.params.item * req.params.pageNumber;
        var productInfo = [];
        var restProduct = [];
        if (req.params.pageNumber == PageNeed) {
            for (var o = startingpoint; o < TotalItem; o++) {
                //     if (LeastRetail[i*req.params.pageNumber-1].id === "") { break; }
                restProduct.push({
                    id: LeastRetail[o].id,
                    product_name: LeastRetail[o].product_name,
                    description: LeastRetail[o].long_description,
                    retail: LeastRetail[o].Unit_retail
                });
            }
            for (var u = 0; u < restProduct.length; u++) {
                if (restProduct[u].product_name === null) { break; }
                restProduct[u].product_name = replacing(restProduct[u].product_name);
                restProduct[u].description = replacing(restProduct[u].description);
            }
            res.send(restProduct);
            return;
        }
        else if (req.params.pageNumber > PageNeed) {
            res.send("Error! Nothing here");
            return;
        }
        else {
            for (var i = startingpoint; i < endpoint; i++) {
                //     if (LeastRetail[i*req.params.pageNumber-1].id === "") { break; }
                productInfo.push({
                    id: LeastRetail[i].id,
                    product_name: LeastRetail[i].product_name,
                    description: LeastRetail[i].long_description,
                    retail: LeastRetail[i].Unit_retail
                });

            }
            console.log(req.params.item * req.params.pageNumber);
            for (var x = 0; x < productInfo.length; x++) {
                if (productInfo[x].product_name === null) { break; }
                productInfo[x].product_name = replacing(productInfo[x].product_name);
                productInfo[x].description = replacing(productInfo[x].description);
            }

            res.send(productInfo);
        }
    }

};
module.exports = controllers;


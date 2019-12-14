var cors = require("cors");
const controllers = require('./controller');
module.exports = function (app) {
    app.use(cors());
    app.route('/')
        .get(controllers.home);
    app.route('/about')
        .get(controllers.about);
    app.route('/leastretail')
        .get(controllers.leastRetail);
    app.route('/leastretail/item/:item/page/:pageNumber')
        .get(controllers.leastRetail2);
    app.route('/sortprice/ascending/item/:item/page/:pageNumber')
        .get(controllers.sortPriceUp);
    app.route('/sortprice/descending/item/:item/page/:pageNumber')
        .get(controllers.sortPriceDown);
    app.route('/products/:id')
        .get(controllers.productPage);
    app.route('/vendors/:id')
        .get(controllers.vendorPage);
};
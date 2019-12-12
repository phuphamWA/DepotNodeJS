var cors = require("cors");
const controllers = require('./controller');
module.exports = function (app) {
    app.use(cors());
    app.route('/about')
        .get(controllers.about);
    app.route('/leastretail')
        .get(controllers.leastRetail);
    app.route('/leastretail/item/:item/page/:pageNumber')
        .get(controllers.leastRetail2);
    app.route('/leastretail/price/ascending/item/:item/page/:pageNumber')
        .get(controllers.sortPriceUp);
 //   app.route('/leastretail/price/descending')
 //       .get(controllers.sortPriceDown);
};
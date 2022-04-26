const routes = require('next-routes')();

routes
   .add('/deposits/new', '/deposits/new')
   .add('/deposits/:address', '/deposits/show');
//setup routes for custom tokens : specific addresses
module.exports = routes;
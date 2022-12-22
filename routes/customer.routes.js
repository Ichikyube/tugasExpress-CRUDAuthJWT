const { authJwt } = require("../middleware");
const customers = require("../controllers/customer.controller");

const router = require("express").Router();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use(router)
  // Create a new Tutorial
  router.post("/api/customer", [authJwt.verifyToken], customers.create); 

  // Retrieve all customers
  router.get("/api/customer", [authJwt.verifyToken], customers.findAll);

  // Retrieve a single Tutorial with id
  router.get("/api/customer/:id", [authJwt.verifyToken], customers.findOne);

  // Update a Tutorial with id
  router.put("/api/customer/:id", [authJwt.verifyToken], customers.update);

  // Delete a Tutorial with id
  router.delete("/api/customer/:id", [authJwt.verifyToken], customers.delete);

  // Create a new Tutorial
  router.delete("/api/customer/", [authJwt.verifyToken], customers.deleteAll);

  app.use('/api/customers', [authJwt.verifyToken], router);
};

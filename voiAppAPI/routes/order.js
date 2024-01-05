const orderController = require("../controller/orderController");
const middlewareController = require("../controller/middlewareController");

const router = require("express").Router();

// Create an order
router.post("/", middlewareController.verifyToken, orderController.create);

// Get orders
router.get("/", middlewareController.verifyToken, orderController.getAll);

module.exports = router;

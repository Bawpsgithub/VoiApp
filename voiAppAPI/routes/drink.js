const drinkController = require("../controller/drinkController");
const middlewareController = require("../controller/middlewareController");
const upload = require("../controller/uploadController");
const router = require("express").Router();

//get all drink for admin
router.get("/admin", middlewareController.verifyToken, drinkController.getAllForAdmin);
//get all drink for user
router.get("/user", middlewareController.verifyToken, drinkController.getAllForUser);
//create a drink
router.post("/",middlewareController.verifyToken, drinkController.create);
//get a drink
router.get("/:id",middlewareController.verifyToken, drinkController.getOne);
//update a drink
router.put("/:id",middlewareController.verifyToken, drinkController.update);
//delete a drink
router.delete("/:id",middlewareController.verifyToken, drinkController.delete);
module.exports = router;

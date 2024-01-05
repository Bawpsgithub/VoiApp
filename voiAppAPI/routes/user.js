const userController = require("../controller/userController")
const middlewareController = require("../controller/middlewareController")

const router = require("express").Router();

//update user
router.put("/:id",middlewareController.verifyToken, userController.update);
//get a user
router.get("/:id",middlewareController.verifyToken, userController.getOne);
//get all user
router.get("/", middlewareController.verifyToken,userController.getAll);
//delete user
router.delete("/:id", middlewareController.verifyToken, userController.delete)
//update an user
router.put("/:id", middlewareController.verifyToken, userController.update)

module.exports = router;
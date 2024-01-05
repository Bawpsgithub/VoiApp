const postController = require("../controller/postController");
const middlewareController = require("../controller/middlewareController");

const router = require("express").Router();

//create a post
router.post("/", middlewareController.verifyToken, postController.create);
//get all post for admin
router.get(
  "/admin",
  middlewareController.verifyToken,
  postController.getAllForAdmin
);
//get all post for user
router.get(
  "/user",
  middlewareController.verifyToken,
  postController.getAllForUser
);
//get a post
router.get("/:id", middlewareController.verifyToken, postController.getOne);
//update a post
router.put("/:id", middlewareController.verifyToken, postController.update);
//delete a post
router.delete("/:id", middlewareController.verifyToken, postController.delete);

module.exports = router;

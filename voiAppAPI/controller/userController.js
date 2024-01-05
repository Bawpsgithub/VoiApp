const User = require("../models/user");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

const userController = {
  // get a user
  getOne: async ({ params }, res) => {
    try {
      const result = await User.findOne({ _id: params.id });
      if (result == null) {
        res.status(400).send({ message: "User not exist" });
      }
      res.status(result ? 200 : 400).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  //get all user
  getAll: async(req, res) => {
    try {
      const users = await User.find({ isAdmin: false, isDeleted: false });
      res.status(200).send({ data: users });
    } catch (error) {
      res.status(500).json(error);
    }
  
  },
  // update a user
  update: async (req, res) => {
    const { fullname, address, email, password } = req.body;
    if (!fullname.trim()) {
      res.status(400).json("Missing name field");
      return;
    }
    if (!address.trim()) {
      res.status(400).json("Missing address field");
      return;
    }
    if (!email.trim()) {
      res.status(400).json("Missing email field");
      return;
    }
    if (!password) {
      res.status(400).json("Missing password field");
      return;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.findOne({ _id: req.params.id });
    if (result == null) {
      res.status(400).json("User not exist or has been deleted");
      return;
    }

    try {
      // Update user with hashed password
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { fullname, address, email, password: hashedPassword },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
    //update a user
    update: async (req, res) => {
      const { fullname, password, email } = req.body;
      const existedUser = await User.findOne({ email, _id: { $ne: req.params.id } });
     
      if (!fullname.trim()) {
        res.status(400).json("Missing fullname");
        return;
      }
      if (!email.trim()) {
        res.status(400).json("Missing email");
        return;
      }
      if (existedUser) {
        console.log("Email already registered:", email);
        return res.status(400).json({ message: "Email already registered" });
      }
      const salt = await bcrypt.genSalt(10);
      const hased = await bcrypt.hash(password, salt);

      const result = await User.findOne({ _id: req.params.id });
      if (result == null || result?.isDeleted == true) {
        res.status(400).json("User not exist or has been deleteced");
        return;
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.params.id },
          { fullname, password: hased, email },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(400).json(error);
      }
    },
    //delete a user
    delete: async (req, res) => {
      try {
        const result = await User.findOne({ _id: req.params.id });
  
        if (result && !result.isDeleted) {
          await User.findOneAndUpdate(
            { _id: req.params.id },
            { isDeleted: true },
            { new: true }
          );
          res.status(200).json("Delete success");
        } else {
          res.status(404).json("User not found or already deleted");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    },
};

module.exports = userController;

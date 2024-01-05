const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authController = {
  //register
  register: async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
      const existedUser = await User.findOne({ email });
      if (existedUser) {
        console.log("Email already registered:", email);
        return res.status(400).json({ message: "Email already registered" });
      }
      let avatar = "";
      if (req.file) {
        avatar = req.file.path;
      }
      const salt = await bcrypt.genSalt(10);
      const hased = await bcrypt.hash(password, salt);

      const newUser = new User({ fullname, email, password: hased, avatar });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "3h" }
    );
  },

  //login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json("Invalid email");
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        res.status(404).json("Invalid password");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        res.status(200).send({
          message: "Login successfully",
          data: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            token: accessToken,
            isAdmin: user.isAdmin,
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Login failed" });
    }
  },

  //logout
  logout: async (req, res) => {
    res.status(200).json("Logged Out Successful");
  },
};

module.exports = authController;

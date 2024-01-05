const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv")


const app = express();
const port = 8000;
const cors = require("cors");
dotenv.config();

const authRoute = require("./routes/auth");
const drinkRoute = require("./routes/drink")
const postRoute = require("./routes/post")
const userRoute = require("./routes/user")
const orderRoute = require("./routes/order")


const expoDevServerUrl = "http://172.16.2.4:8000";
app.use(
  cors({
    origin: [expoDevServerUrl],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose
  .connect("mongodb+srv://ie307:ie307@ie307db.lbahppy.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});


//route
app.use("/api/auth", authRoute);
app.use("/api/drink", drinkRoute)
app.use("/api/post",postRoute)
app.use("/api/user",userRoute)
app.use("/api/order",orderRoute)
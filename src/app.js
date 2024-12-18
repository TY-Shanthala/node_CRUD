const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const { dbConnect } = require("./config/mongoConnection");
const cookieParcer = require("cookie-parser");
const authRoute = require("./routes/authRoute");
// creation of server
const app = express();
app.use(express.json());
app.use(cookieParcer());
app.use(
  cors({
    origin: "http://localhost:3000", // Update with your frontend origin if different
    credentials: true,
  })
);

// routes
app.use("/", authRoute);
app.use("/", userRouter);

// connecting to the DB and listening to the port
dbConnect()
  .then(() => {
    console.log("successfully connected to db...");
    app.listen("7777", () => {
      console.log("port 7777 is up and running...");
    });
  })
  .catch((err) => {
    console.log(err, "error in the connection");
  });

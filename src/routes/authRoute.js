const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRoute = express.Router();

authRoute.post("/login", async (req, resp) => {
  try {
    const { gmail, password } = req.body;
    const userGmail = await User.findOne({ gmail: gmail });
    if (!userGmail) {
      throw new Error("user dose not exist");
    }
    const isPassword = await bcrypt.compare(password, userGmail.password);
    if (isPassword) {
      // create the token
      const token = jwt.sign({ id: userGmail._id }, "SAJJAN@!23");
      // save the token in resp cookies
      resp
        .cookie("token", token, {
        //   httpOnly: true, // Prevents JavaScript access (more secure)
          secure: true, // Required for HTTPS (Cloudflare requires it)
          sameSite: "None", // Required for cross-origin requests
          path: "/", // Ensures the cookie is available on all routes
        })
        .send({ message: "Logedin successfully", token: token });
    }
  } catch (err) {
    resp.status(400).send("something went wrong while login");
  }
});

module.exports = authRoute;

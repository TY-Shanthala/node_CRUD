const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");

const userRouter = express.Router();
userRouter.post("/user/createUser", async (req, resp) => {
    try {
        // destructur the user data from request body
        const { firstName, lastName, age, gmail, password } = req.body
        // hashing the password
        const hashPassword = await bcrypt.hash(password, 10);
        // create the actual object through the user schema
        const userData = new User({
            firstName,
            lastName,
            age,
            gmail,
            password: hashPassword
        })
        // save the actual object to the db
        await userData.save();
        // send the resp after saving the data to DB
        resp.json({ message: "user data saved successfully" })

    } catch (err) {
        resp.send("something went wrong while saving user data")
    }
})

// api to get the data from user schema
userRouter.get("/user/getUserData", userAuth, async (req, resp) => {
    try {
        resp.json({
            data: req.user,
            message: "data fetched successfully"
        })
    } catch (err) {
        resp.status(400).send("something went wrong while data fetch")
    }

})



module.exports = userRouter
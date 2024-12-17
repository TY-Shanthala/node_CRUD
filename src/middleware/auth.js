const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = ("/user", async (req, resp, next) => {
    try {
        const token = req.cookies
        const userId = await jwt.verify(token.token, "SAJJAN@!23")
        if (!userId) {
            throw new Error("invalid credentials")
        } else {
            const userInfo = await User.findOne({ _id: userId.id })
            req.user = userInfo
            next()
        }
    } catch (err) {
        resp.status(400).send("invalid credentials")
    }
})

module.exports = { userAuth }


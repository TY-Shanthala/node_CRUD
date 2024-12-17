const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        maxLength: 20,
        required: true
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 20,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
        required: true
    },
    gmail: {
        type: String,
        validate: (value) => {
            if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
                throw new Error("gmail is not valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("User", userSchema)
const mongoose = require("mongoose")

const url = "mongodb+srv://hithanmi10:8iTai6V47UCA3umW@mycluster.mb947.mongodb.net/UserCRUD"

const dbConnect = async () => {
    await mongoose.connect(url)
}

module.exports = { dbConnect }
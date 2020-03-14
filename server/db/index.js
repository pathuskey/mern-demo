const mongoose = require("mongoose")

mongoose
  .connect(process.env.MONGO_CONNECTION || "mongodb://database:27017/cinema", {
    useNewUrlParser: true
  })
  .catch(e => {
    console.error("Connection error", e.message)
  })

const db = mongoose.connection

module.exports = db

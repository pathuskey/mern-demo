const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Movie = new Schema(
  {
    name: { type: String, required: true },
    times: { type: [String], required: true },
    rating: { type: Number, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model("movies", Movie)

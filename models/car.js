


const mongoose = require("mongoose")

const carSchema = mongoose.Schema({
  make: String,
  model: String,
  cost: String
})

module.exports = mongoose.model("Car", carSchema)

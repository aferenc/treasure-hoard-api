const mongoose = require("mongoose");

// Schema for Treasure object
const treasureSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    series: String,
    real_world_object: String,
    location: String,
    value: Number,
    weight: Number,
    max_carriers: Number,
    in_enemy: String,
    buried: String,
    dynamic_weight: Boolean,
    olimar_notes: String,
    sales_pitch: String
});
// Create the Treasure model based on the "us_treasures" collection in the DB
module.exports = mongoose.model("Treasure", treasureSchema, "us_treasures");
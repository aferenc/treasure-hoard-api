const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Treasure = require("./Treasure");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/treasure_hoard", 
    () => { console.log("Connected to database") },
        e => console.error("Error connecting to database: " + e), 
    { useNewUrlParser: true }
);

// GET all treasures
app.get("/treasures", (request, result) => {
    Treasure.find((err, foundTreasures) => {
        if(!err) {
            result.send(foundTreasures);
        } else {
            result.send(err);
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
})
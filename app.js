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
    Treasure.find()
        .then( foundTreasures => {
            result.send(foundTreasures);
        })
        .catch( err => {
            result.send(err);
        });
});

// GET a treasure by ID
app.get("/treasures/:id", (request, result) => {
    Treasure.findById(request.params.id)  
        .then( foundTreasure => {
            if(foundTreasure) {
                result.send(foundTreasure);
            }
            else {
                result.send("Please provide an ID between 1 and 201.");
            }
        })
        .catch( err => {
            result.send(err);
        });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})
var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    
    var animal = req.params.animal.toLowerCase()
    var sounds = {
        pig: "oink",
        cow: "moo",
        dog: "woof",
        cat: "i hate you human!",
        bender: "kill all humans!",
    };
    
    var sound = sounds[animal];
    if (sounds.hasOwnProperty(animal) === false) {
        animal = "human";
        sound = "derp derp derp...";
    }

    res.send("The " + animal + " says..." + sound);
});

app.get("/repeat/:command/:times", function(req, res) {

    var phrase = req.params.command;
    var count = Number(req.params.times);
    var responsePhrase = "";

    for (var i = 0; i < count; i++) {
        responsePhrase += " " + phrase;
    }
    res.send(responsePhrase);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found..what are you doing with your life");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started at port_" + process.env.PORT);
});
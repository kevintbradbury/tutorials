var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/", function(req, res) {

    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user });
        }
    });
    // res.render("campgrounds", { campgrounds: campgrounds });
});

// Create -- add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {

    var name = req.body.name;
    var image = req.body.image;
    var descrip = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name: name, image: image, description: descrip, author: author };

    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
    // res.render("show");
});

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {

    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err || !foundCampground){
            console.log(err)
            return res.render("back")
        }
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

//Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            //redirect somewhere(show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Delete Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;
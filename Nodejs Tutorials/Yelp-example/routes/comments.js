var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err)
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   req.flash("error", "Error creating comment")
                   console.log(err)
               } else {
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   console.log(comment);
                   
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
   });
});

//Comments Edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Cannot find reference to Campground");
            res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "Comment not found")
                res.redirect("back");
            } else {
                res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
            }
        });
    });
});

//Comments Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){

   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
       if(err || !updateComment){
           console.log(err);
           res.sender("could not update comment");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//Comment Delete Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
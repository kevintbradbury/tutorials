var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog_demo_2", { useMongoClient: true });

var Post = require("./models/post")
var User = require("./models/user")


// User.findOne({email: "bob@email.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err)
//     }else {
//         console.log(user);
//     }
// });

Post.create({
    title: "A better burger pt 4",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}, function(err, post) {

    User.findOne({ email: "bob@email.com" }, function(err, foundUser) {
        if (err) {
            console.log(err);
        }
        else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                }
            })
        }
    });

});

// User.create({
//     email: "bob@email.com",
//     name: "Bob belcher"
// });
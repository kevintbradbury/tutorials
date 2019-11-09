var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog_demo", { useMongoClient: true });

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

var Post = mongoose.model("Post", postSchema);

// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione granger"
// });

// newUser.posts.push({
//     title: "how to brew polyjuice potion",
//     content: "JK. Go to potions class to learn"
// });

// newUser.save(function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log("saved user : " + user);
//   }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("saved post" + post);
//     }
// });

User.findOne({name: "Hermione granger"}, function(err, user){
    if(err){
        console.log(err);
    } else {
        user.posts.push({
            title: "Three things i really hate",
            content: "voldemort voldemort voldemort"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});

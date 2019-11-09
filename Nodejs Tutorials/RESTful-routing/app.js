var express              = require("express"),
app                      = express(),
bodyparser               = require("body-parser"),
mongoose                 = require("mongoose"),
methodOverride            = require("method-override");
        
mongoose.connect("mongodb://localhost/blog_app", { useMongoClient: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create(
//     {
//     title: "Blogs for dogs",
//     image: "https://farm8.staticflickr.com/7283/16663491818_7fe40b9dca.jpg",
//     body: "Hello this is a blog post",
//     }
// );

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log(err);
        } else {
               res.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", function(req, res){
   res.render("new"); 
});

app.post("/blogs", function(req, res){
   Blog.create(req.body.blog, function(err, newBlog){
       if(err) {
        res.render("new");
       } else {
           res.redirect("/blogs");
       }
   }) 
});

app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/blogs");
      } else {
          res.render("show", {blog: foundBlog});
      }
   });
});

app.get("/blogs/:id/edit", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("edit", {blog: foundBlog}); 
       }
   })
});

app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
});

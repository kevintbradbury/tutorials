var express           = require("express"),
app                   = express(),
mongoose              = require("mongoose"),
passport              = require("passport"),
bodyParser            = require("body-parser"),
localStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
User                  = require("./models/user");
 


mongoose.connect("mongodb://localhost/auth_demo_app", {useMongoClient: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
   secret: "Rusty is the best",
   resave: false,
   saveUninitialized: false
}));
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

app.get("/register", function(req,res){
    res.render("register");
});

app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret"); 
        });
    });
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect:"/secret",
    failureRedirect: "/login"
}), function(req, res){
    
});

app.get("/logout", isLoggedIn, function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    console.log("user is authenticated : " + req.isAuthenticated());
    
    if(req.isAuthenticated()) {
        return next();
    }
        res.redirect("/login");
    
}


//---------> Listener method...LEAVE THIS HERE!
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("server started")
});

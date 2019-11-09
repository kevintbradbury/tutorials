var express    = require("express"),
app            = express(),
bodyParser     = require("body-parser"),
mongoose       = require("mongoose"),
Campground     = require("./models/campground"),
Comment        = require("./models/comment"),
seedDB         = require("./seeds"),
passport       = require("passport"),
LocalStrategy  = require("passport-local"),
User           = require("./models/user"),
methodOverride = require("method-override"),
flash          = require("connect-flash");

var commentRoutes = require("./routes/comments"),
campgroundRoutes  = require('./routes/campgrounds'),
indexRoutes       = require("./routes/index");

// App configuration 
mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true });
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "Once again Rusty wins",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seedDB();  //


// App Listener
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server started");
});

//imports
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash"),
    passport    =require("passport"),
    LocalStrategy= require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

//requiring routes
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

//seedDB();
//mongoose.connect("mongodb://localhost/yelp_camp",{useMongoClient: true});
mongoose.connect("mongodb://sakura:1234@ds151078.mlab.com:51078/yelpcamp_wdb",{useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport configuration
app.use(require("express-session")({
    secret: "you've arrived to the secret page",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this function will be called on every single route
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use("/",indexRoutes);
//appends /campgrounds to all the campground routes
app.use("/campgrounds",campgroundRoutes);
//to get this id we need to mergeParams on route
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server started") 
});


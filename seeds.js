//Database seeding is the initial seeding of a database with data.
//This is often an automated process that is executed upon the initial setup of an application.

var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Granite Hill",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description:"This is a very beautiful camp ground. Must visit"
    },
    {
        name: "Salmon Creek",
        image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
        description:"This is a very scenic camp ground. Visit only during summers"
    },
    {
        name: "Montana View",
        image: "https://farm5.staticflickr.com/4101/4961777592_322fea6826.jpg",
        description:"This is a very huge camp ground. Be aware of animals around the camp site"
    }   ];

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
         if(err){
             console.log(err);
         }
    //     console.log("removed campgrounds!");
    //      //add a few campgrounds
    //     data.forEach(function(seed){
    //         Campground.create(seed, function(err, campground){
    //             if(err){
    //                 console.log(err)
    //             } else {
    //                 console.log("added a campground");
    //                 //create a comment
    //                 Comment.create(
    //                     {
    //                         text: "This place is great, but I wish there was internet",
    //                         author: "Homer"
    //                     }, function(err, comment){
    //                         if(err){
    //                             console.log(err);
    //                         } else {
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log("Created new comment");
    //                         }
    //                     });
    //             }
    //         });
    //     });
     }); 

}
module.exports = seedDB;


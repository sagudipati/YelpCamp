var middlewareObj = {};

var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

middlewareObj.checkCampgroundOwnership= function(req,res,next){
        
    if(req.isAuthenticated()){
           Campground.findById(req.params.id, function(err,foundCampground){
       if(err || !foundCampground){
    req.flash("error", "Campground not found");
  
           res.redirect("back");
       } else{
           if(foundCampground.author.id.equals(req.user._id)){
                //next is the block of code thats there in the router logic
                next();
       } else{
             req.flash("error", "You don't have permission to do that");
           res.redirect("back");
       }
       }
    });
    
        }else{
              req.flash("error", "You need to be logged in to do that");
            //goes back to the previous page
        res.redirect("back");
    }
    
}


middlewareObj.checkCommentOwnership = function(req,res,next){
        
    if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id, function(err,foundComment){
       if(err || !foundComment){
           req.flash("error", "Comment not found");
           res.redirect("back");
       } else{
           if(foundComment.author.id.equals(req.user._id)){
                //next is the block of code thats there in the router logic
                next();
       } else{
     req.flash("error", "You need to be logged in to do that");
           res.redirect("back");
       }
       }
    });
    
        }else{
   req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
    }
    
}    

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login");
}


module.exports = middlewareObj;
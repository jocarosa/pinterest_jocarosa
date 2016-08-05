'use strict';
var configAuth       = require('./auth');
var TwitterStrategy  = require('passport-twitter').Strategy;
var User             = require('../model/Users')

module.exports=function(passport){
    
   passport.use(new TwitterStrategy({
            
            consumerKey: configAuth.twitterAuth.clientID,
         consumerSecret: configAuth.twitterAuth.clientSecret,
            callbackURL: configAuth.twitterAuth.callbackURL
            
  },
  function(token, tokenSecret, profile, done) {
    
        //serializer user
        
        passport.serializeUser(function (user, done) {
		    done(null, user.id);
	    });

	    passport.deserializeUser(function (id, done) {
		    
		    User.findById(id, function (err, user) {
			    done(err, user);
		    });
	    });    
        //find user
        User.findOne({ 'twitter.id': profile.id }, function (err, user) {
				    if (err) {
					    return done(err);
				    }

				    if (user) {
					    return done(null, user);
					} 
					
					
					//creating new user after token
					else {
					    var newUser = new User();

					    newUser.twitter.id          = profile.id;
					    newUser.twitter.token       = profile.token;
					    newUser.twitter.username    = profile.username;
					    newUser.twitter.displayName = profile.displayName;
					    
					    newUser.save(function (err) {
						
						    if (err) {
							    throw err;
						    }

						    return done(null, newUser);
						    
					    });
				    }
			});
    
   
  })); 
    
};


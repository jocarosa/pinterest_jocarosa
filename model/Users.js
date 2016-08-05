var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  
var personSchema = Schema({
    
    twitter: {
        id            : Number,
        username      : String,
        displayName   : String,
        token         : Number
    }
  	  
});

module.exports = mongoose.model('Users', personSchema);
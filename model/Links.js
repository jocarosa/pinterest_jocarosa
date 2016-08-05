var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
  
var linkSchema = Schema({
        
        link          : String,
        idUser        : String
});

module.exports = mongoose.model('Links', linkSchema);
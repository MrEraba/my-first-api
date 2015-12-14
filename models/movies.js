var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var movieSchema = new Schema({
	title : String,
	description : String,
	director : String,
	genre : String
});

module.exports = mongoose.model('Movie' ,movieSchema);
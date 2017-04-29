var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var citySchema = mongoose.Schema({
  cityName: String,
  cityTemp: String
});

var City = mongoose.model('City', citySchema);

var selectAll = function(callback) {
  City.find({}, function(err, cities) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, cities);
    }
  });
};

module.exports.selectAll = selectAll;
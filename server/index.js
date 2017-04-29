var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cities = require('../database-mongo');
var City = require('../database-mongo/index.js');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/cities', (req, res) => {
  var newLocation = req.body.location;
  var cityAndState = req.body.location.split(', ');
  var myCity = cityAndState[0];
  var myState = cityAndState[1];
  var accessToken = '7301828142ce2236'

  request(`http://api.wunderground.com/api/${accessToken}/conditions/q/${myState}/${myCity}.json`, (err, res, body) => {
    body = JSON.parse(body);
    console.log(body.current_observation.feelslike_string);

    var newCity = new City({
      cityName: body.current_observation.display_location.full,
      cityTemp: body.current_observation.temperature_string,
      cityWeather: body.current_observation.weather,
      cityFeelsLike: body.current_observation.feelslike_string
    })

  });

  console.log('POST request received from CLIENT!')
  res.send();
})

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


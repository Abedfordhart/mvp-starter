var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cities = require('../database-mongo');

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
  var newCity = cityAndState[0];
  var newState = cityAndState[1];
  var accessToken = '7301828142ce2236'

  // const options = {
  //   url: `http://api.wunderground.com/api/${accessToken}/conditions/q/${newState}/${newCity}.json`,
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Accept-Charset': 'utf-8',
  //     'User-Agent': 'weatherClient'
  // }
  request(`http://api.wunderground.com/api/${accessToken}/conditions/q/${newState}/${newCity}.json`, (err, res, body) => {
    body = JSON.parse(body);
    console.log(body);
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


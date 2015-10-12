var request = require('request');
var Location = require('');
function routing(constring)
{

	request('http://www.yournavigation.org/api/1.0/gosmore.php?format=geojson&flat=52.215676&flon=5.963946&tlat=52.2573&tlon=6.1799&fast=0', function (error, response, body,req) {
    if (!error && response.statusCode == 200) {
        
    var geoObject = JSON.parse(body);
    var coordinat=geoObject.coordinates;
    var traveltime=geoObject.properties.traveltime;
    var distance=geoObject.properties.distance;
    var startpoint='colombo';
    var droppoint='kaduwela';
    var now = new Date();
    var loct = new Location({points:geoObject,date:now,startpoint:startpoint,droppoint:droppoint},constring);
    loct.save();
   
  }
})





}
module.exports = Funct;
//Setting Variables
var pano,places,distanceLat,distanceLng,diff;
//Distance to Location
var distance = {};
//Player's Position
var pos = {};
var viewNum = 0;
//Loads in the places.json
function preload(){
places = loadJSON("places.json");
}

function setup(){
  //For testing
  print("done");
}

function initMap() {
  //Creates the Veiw with all the settings intact
  pano = new google.maps.StreetViewPanorama(
    document.getElementById('pano'), {
      position:{lat: 42.335, lng: -71.089},
      pov: {
        heading: 34,
        pitch: 10
      },
      addressControl: false,
      linksControl: false,
      clickToGo: false,
      scrollWheel: false,
      showRoadLabels: false
    }
  );
  //Finds Location
  if (navigator.geolocation) {
    navigator.geolocation.watchCurrentPosition(function(position) {
      pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
      //Sets Veiw at current location
      pano.setPosition(pos);
      //Manages errors if player doesn't choose to share location
  }, function() {
       handleLocationError(true,pano.getPosition());
      });
  } else {
  handleLocationError(false, pano.getPosition());
  }
}
//Error control
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}
//Your Position Button
function backHome(){
  pano.setPosition(pos);
}
// Easy Button
function easyPos(){
  diff = places.easy;
  distanceSet();
}
//Medium Button
function medPos(){
  diff = places.medium;
  distanceSet();
}
//Hard Button
function hardPos(){
  diff = places.hard;
  distanceSet();
}
//New Veiws Button
function newViews(){
  viewNum++;
  if(viewNum>places.easy.length-1){
    viewNum = 0;
  }
  distanceSet();
}
//Finds and Sets the distance between player and veiw
function distanceSet(){
  pano.setPosition(diff[viewNum]);
  distance = {
    distanceLat:Math.abs(pos.lat-diff[viewNum].lat),
    distanceLng:Math.abs(pos.lng-diff[viewNum].lng)
  }
    print(distance);
    var meterDist = 111111*sqrt(sq(distance.distanceLng)+sq(distance.distanceLat));
    document.getElementById("meters").innerHTML = round(meterDist) + "m";
    if(meterDist<600){
      document.getElementById("meters").innerHTML = round(meterDist) + " " + diff[viewNum].message ;
    }
}
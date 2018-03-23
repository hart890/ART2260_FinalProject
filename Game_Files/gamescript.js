var pano,places,distanceLat,distanceLng,diff;
var distance = {};
var pos = {};
var viewNum = 0;
function preload(){
places = loadJSON("places.json");
}
function setup(){
  print("done");
}

function initMap() {
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
      scrollWheel: false
    }
  );
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
      pano.setPosition(pos);
  }, function() {
       handleLocationError(true,pano.getPosition());
      });
  } else {
  handleLocationError(false, pano.getPosition());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}

function backHome(){
  pano.setPosition(pos);
}

function easyPos(){
  diff = places.easy;
  distanceSet();
}

function medPos(){
  diff = places.medium;
  distanceSet();
}

function hardPos(){
  diff = places.hard;
  distanceSet();
}

function newViews(){
  viewNum++;
  if(viewNum>places.easy.length-1){
    viewNum = 0;
  }
  distanceSet();
}

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
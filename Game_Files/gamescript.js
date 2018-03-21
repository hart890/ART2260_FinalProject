var pano,pos,places;
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
  pano.setPosition(places.easy[viewNum]);
}

function medPos(){
  pano.setPosition(places.medium[viewNum]);
}

function hardPos(){
  pano.setPosition(places.hard[viewNum]);
}

function newViews(){
  viewNum++;
  if(viewNum>places.easy.length-1){
    viewNum = 0;
  }
}
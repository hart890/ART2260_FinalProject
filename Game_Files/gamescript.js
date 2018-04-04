//Setting Variables
var pano,stories,distanceLat,distanceLng;
//Distance to Location
var distance = {};
//Player's Position
var pos = {};
var chapNum = 0;
var range = 40;
//Loads in the places.json
function preload(){
  stories = loadJSON("stories.json");
}

function setup(){
  //For testing
  print("done");
  placeSet();
  print(stories.stories[0])
  angleMode(DEGREES);
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
      showRoadLabels: false,
      keyboardShortcuts: false
    }
  );
  //Sets Text
  //Finds Location
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
      distanceSet();
      //Sets Veiw at current location
      //pano.setPosition(pos);
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

function placeSet(){
  print(chapNum);
  document.getElementById('chapterTitle').innerHTML = stories.stories[0].places[chapNum].chapter;
  document.getElementById('storyText').innerHTML = stories.stories[0].places[chapNum].text;
  pano.setPosition(stories.stories[0].places[chapNum+1]);
}

function nextPlace(){
  if(chapNum<stories.stories[0].places.length-1){
    chapNum++;
  }
  placeSet();
}

function on() {
  placeSet();
  document.getElementById('chapterTitleInside').innerHTML = stories.stories[0].places[chapNum+1].chapter;
  document.getElementById('storyTextInside').innerHTML = stories.stories[0].places[chapNum+1].text;
  document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

function distanceSet(){
  distance = {
    distanceLat:Math.abs(pos.lat-stories.stories[0].places[chapNum+1].lat),
    distanceLng:Math.abs(pos.lng-stories.stories[0].places[chapNum+1].lng)
  };
    var meterDist = 111111*sqrt(sq(distance.distanceLng)+sq(distance.distanceLat));
    document.getElementById("meters").innerHTML = round(meterDist) + "m " + direction();
    if(meterDist<range){
      on();
    }
}

function direction(){
  var direct = "West"
  var pointing = atan2(stories.stories[0].places[chapNum+1].lat-pos.lat,stories.stories[0].places[chapNum+1].lng-pos.lng);
  if(pointing >= -22.5 && pointing<22.5){
    direct = "East";
  }else if(pointing>=22.5 && pointing< 67.5){
    direct = "North East";
  }else if(pointing>= 67.5 && pointing<112.5){
    direct = "North";
  }else if(pointing>= 122.5 && pointing<157.5){
    direct = "North West";
  }else if(pointing >= -67.5 && pointing< -22.5){
    direct = "South East";
  }else if(pointing >= -112.5 && pointing< -67.5){
    direct = "South";
  }else if(pointing >= -157.5 && pointing< -122.5){
    direct = "South West";
  }else{
    direct = "West"
  }
  return(direct);
}


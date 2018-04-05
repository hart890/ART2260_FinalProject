var map,pano;
var currentMarker = [];
var pins = [];
var latLngs = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.335, lng: -71.089},
    zoom: 14
  });

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('pano'), {
      position:{lat: 42.335, lng: -71.089},
      pov: {
        heading: 34,
        pitch: 10
      },
      linksControl: false,
      addressControl:false
  });

  map.setStreetView(panorama);
}

function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          label:labels[labelIndex-1 % labels.length]
        });
        map.panTo(latLng);
        panorama.setPosition(latLng);
        setMapOnAll(null);
        currentMarker = [];
        currentMarker.push(marker);
        currentMarker.push(latLng);
        setMapOnAll(map);
}

 function setMapOnAll(maps) {
        for (var i = 0; i < currentMarker.length; i+=2) {
          currentMarker[i].setMap(maps);
        }
        for(var i = 0; i<pins.length;i++){
          pins[i].setMap(map);
        }
      }

function pin(){
  if(labelIndex == 0){
    map.addListener('click', function(e) {
          placeMarkerAndPanTo(e.latLng, map);
    });
  }
  if(labelIndex>0){
    pins.push(currentMarker[0]);
    latLngs.push(currentMarker[1]);
  }
  labelIndex++;
}

function prev(){
  pins.pop();
  labelIndex--;
}
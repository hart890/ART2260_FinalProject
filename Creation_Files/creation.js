var map,pano;
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
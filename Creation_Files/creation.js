var test = {
        lat: 40,
        lng: -131
      }
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.335, lng: -71.089},
          zoom: 14
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Here you are ' + position.coords.accuracy);
            infoWindow.open(map);
            map.setCenter(pos);
            var difa = Math.abs(test.lat - pos.lat);
            var difo = Math.abs(test.lng - pos.lng);
            if(difa<40){
               infoWindow.setContent("Here you are and you're close Accuracy: " + position.coords.accuracy);
            }
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
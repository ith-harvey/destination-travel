(function() {
  angular.module('starter')
    .service('mapService', service, mapDetailsService)

    service.$inject = []

    function service () {
      const mapService = this
      let map
      let savedMarkersArr = []
      let geocoder = new google.maps.Geocoder();
      let details
      let searchedMarker = []

      mapService.render = function (mapid, zoom) {
        console.log('in render');
        let mapOptions = {
          center: ({
            lat: 39.82,
            lng: -95.712
          }),
          zoom: zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false
        };

        map = new google.maps.Map(document.getElementById(mapid), mapOptions);
      }

      mapService.placeMarkers = function (locationsArr,locScope, iconImage) {
        let bounds = new google.maps.LatLngBounds();

        locationsArr.forEach( (location, index) => {

          let latlng = ({lat: Number(location[locScope + '_lat']),lng: Number(location[locScope + '_lng'])})

          let marker = new google.maps.Marker({
            position: latlng,
            map: map,
            animation: google.maps.Animation.DROP,
            label: index.toString(),
            icon: iconImage
          });
          bounds.extend(latlng);
          savedMarkersArr.push(marker)
        })
        console.log('loging bounds-->', bounds);
        map.fitBounds(bounds)
      }

      mapService.search = function (address) {
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            let latlng = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }
            console.log('logging latlng -->', latlng);
            mapService.updateMap(latlng)
          } else {
            console.error('Geocode was not successful --> ' + status);
          }
        });
      }

      mapService.updateMap = function (latLng) {

        map.setCenter(latLng)
        map.setZoom(15)

        details = mapDetailsService.getSearchItemDetails()

        let image = {
        url: details.icon,
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
        }

        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: image
        });

        searchedMarker.push(marker)
      }




    }
}());

(function() {
  angular.module('starter')
    .service('mapService', service)

    service.$inject = ['mapDetailsService', 'gMarkersService']

    function service (mapDetailsService, gMarkersService) {

      const mapService = this
      let map
      let savedMarkersArr = []
      let geocoder = new google.maps.Geocoder();
      let searchedMarker = []
      let starredMarkers = []


      // initializes the map
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


      // Places markers on the current map
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


      // takes address and fires updateMap with lat and lng
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

      // alters zoom, center of map and places a marker on the searched location
      mapService.updateMap = function (latLng) {

        map.setCenter(latLng)
        map.setZoom(15)

        let details = mapDetailsService.getSearchItemDetails()

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


      mapService.saveLocation = function(city_id, description) {

        let details = mapDetailsService.getSearchItemDetails()
        let lat = details.geometry.location.lat()
        let lng = details.geometry.location.lng()

        searchedMarker.pop().setMap(null)

        let image = {
          url: 'img/Gold_star.png',
          scaledSize: new google.maps.Size(20, 20),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32)
        }

        let marker = new google.maps.Marker({
          position: ({lat,lng}),
          map: map,
          icon: image
        });

        //pushing marker(gmaps formatted) into local array
        starredMarkers.push(marker)

        let dbmarker = {
          city_id: city_id,
          marker_name: details.name,
          marker_description: description,
          marker_lat: lat.toString(),
          marker_lng: lng.toString()
        }

        //posting marker(dbase formatted)
        gMarkersService.markerPost(city_id, dbmarker).then(result => {
          console.log('result from gMarkers Service', result);
        })
      }


    }
}());

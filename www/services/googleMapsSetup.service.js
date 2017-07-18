(function() {
  angular.module('starter')
    .service('mapService', service)

    service.$inject = ['mapDetailsService', 'gMarkersService', 'citiesService']

    function service (mapDetailsService, gMarkersService, citiesService) {

      const mapService = this
      let map
      let savedMarkersArr = []
      let geocoder = new google.maps.Geocoder();
      let searchedMarker = []
      let starredMarkers = []

      let alphabetArr =[ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z' ]


      mapService.getAlphabetArr = function () {
        return alphabetArr
      }


      // initializes the map
      mapService.render = function (mapid, zoom, city) {

        function setLatLng(cityForLatLng) {
          if (cityForLatLng) {
            return ({lat: Number(cityForLatLng.city_lat),lng: Number(cityForLatLng.city_lng)})
          }
          return ({lat: 39.82,lng: -95.712})
        }

        let mapOptions = {
          center: setLatLng(city),
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
            label: alphabetArr[index],
            icon: iconImage
          });
          bounds.extend(latlng);
          savedMarkersArr.push(marker)
        })
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


      // Watches for fireSearchWithItemDetails to fire, once it does it checks for the object. If there is an object it runs search
      mapService.saveLocation = function(resource, description, postToId ) {

        let details = mapDetailsService.getSearchItemDetails()
        let lat = details.geometry.location.lat()
        let lng = details.geometry.location.lng()

        searchedMarker.pop().setMap(null)

        marker = function (resource) {
          let image = {
            url: 'img/Gold_star.png',
            scaledSize: new google.maps.Size(20, 20),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
          }

          // if marker it gets a star
          if(resource === 'marker') {
            return new google.maps.Marker({
              position: ({lat,lng}),
              map: map,
              icon: image
            });
          }
          // if city it gets a basic marker
          if(resource === 'city') {
            return new google.maps.Marker({
              position: ({lat,lng}),
              map: map
            });
          }
        }

        //pushing marker(gmaps formatted) into local array
        starredMarkers.push(marker(resource))
          let dbmarker = {}
          dbmarker[`${resource}_name`] = details.name,
          dbmarker[`${resource}_description`] = description,
          dbmarker[`${resource}_lat`] = lat.toString(),
          dbmarker[`${resource}_lng`] = lng.toString()
          dbmarker[`${resource}_place_id`] = details.place_id

        if (resource === 'city') {
          console.log('postToId', postToId);
          console.log('dbmarker', dbmarker);
          citiesService.postMarker(postToId,dbmarker).then(result => {
            console.log('result from cities Service', result);
          })
        }

        if (resource === 'marker') {
          //posting marker(dbase formatted)
          dbmarker.city_id = postToId
          gMarkersService.markerPost(postToId, dbmarker).then(result => {
            console.log('result from gMarkers Service', result);
          })
        }

      }

      mapService.getPlaceInfo = function (placeId,callback) {
        service = new google.maps.places.PlacesService(map);
        service.getDetails({placeId: placeId}, callback)
      }


      // under construction
      mapService.removeMarker = function (marker,index) {
        console.log(marker);
        savedMarkersArr.splice(savedMarkersArr.indexOf(marker))
      }

    }
}());

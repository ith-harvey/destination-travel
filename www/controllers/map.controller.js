

angular.module('starter').controller('markerMapCtrl', function($scope, $rootScope, $state, $cordovaGeolocation, mapService, gMarkersService) {
  console.log($state.params.id, 'state params!!');

  let options = {timeout: 10000, enableHighAccuracy: true};
  let geocoder = new google.maps.Geocoder();
  $scope.details
  $scope.mapWatchService = mapService
  $scope.destinationDisplay = false
  $scope.footerActive = false
  $scope.markerMapClass = 'marker-map-full'
  const gMarkers = []
  const savedGMarkers = []


  // Map gets initialized to to world view
  let mapOptions = {
      center: ({lat: 39.82, lng: -95.712}),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    };

  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


  // Once geolocation is retreived from device a new map is rendered
  gMarkersService.allMarkersByCity($state.params.id).then(markers => {
    console.log('what we get back from markers --> ', markers);
  })


    // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //
    // let mapOptions = {
    //     center: latLng,
    //     zoom: 12,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP,
    //     mapTypeControl: false
    //   };
    //
    // $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //
    // let marker = new google.maps.Marker({
    //     map: $scope.map,
    //     animation: google.maps.Animation.DROP,
    //     position: latLng
    // });


 // Watches for fireSearchWithItemDetails to fire, once it does it checks for the object. If there is an object it runs search
  $scope.$watch('mapWatchService.fireSearchWithItemDetails()', newVal => {
    if (typeof newVal === 'object') {
    $scope.searchMap(newVal.formatted_address)
    }
  })


// retreives lat lng using googles geocode
  $scope.searchMap = function (address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === 'OK') {
        console.log('results -->', results);
        let latlng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
        $scope.updateMap(latlng)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  // updates the map once the lat lng is retreived from geocoder has been run or rather (onblur)
  $scope.updateMap = function (latLng) {
    console.log('latlng -->',latLng)


    $scope.map.setCenter(latLng)
    $scope.map.setZoom(15)

    $scope.$apply(function () {
      $scope.details = mapService.getSearchItemDetails()

      let image = {
          url: $scope.details.icon,
          scaledSize: new google.maps.Size(20, 20),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32)
      }

      let marker = new google.maps.Marker({
        position: latLng,
        map: $scope.map,
        icon: image
      });
      gMarkers.push(marker)
      $scope.footerActive = true
      $scope.changeMapClass()
    })
  }


  // hides and shows the destination Display
  $scope.displayFire = function () {
    $scope.destinationDisplay ? $scope.destinationDisplay = false : $scope.destinationDisplay = true
  }

  $scope.saveDestination = function () {
    console.log('saving destination');

  }

  $scope.changeMapClass = function () {
    $scope.markerMapClass = 'mapWithDestination'

  }

  $scope.cancelSearch = function () {
    $scope.result.location = ''

  }


    $scope.onTextClick = function ($event) {
      $event.target.select();
    };

  $scope.saveLocation = function (destinationObj) {
    let lat = mapService.getSearchItemDetails().geometry.location.lat()
    let lng = mapService.getSearchItemDetails().geometry.location.lng()

    // let latlng = ({mapService.getSearchItemDetails().geometry.location.lat(), mapService.getSearchItemDetails().geometry.location.lng()})
    gMarkers.pop().setMap(null)
    console.log('here is gMarkers', gMarkers);
    console.log(mapService.getSearchItemDetails().geometry.location.lat());
    console.log('inside of save location');
    let image = {
        url: 'img/Gold_star.png',
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    }

    let marker = new google.maps.Marker({
      position: ({lat, lng}),
      map: $scope.map,
      icon: image
    });

    savedGMarkers.push(marker)

  }



})

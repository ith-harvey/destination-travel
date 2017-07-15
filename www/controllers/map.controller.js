angular.module('starter').controller('markerMapCtrl', function($scope, $rootScope, $state, mapDetailsService, gMarkersService, $ionicModal, mapService) {
  let city_id = $state.params.id
  $scope.details
  $scope.mapWatchService = mapService
  $scope.destinationDisplay = false
  $scope.footerActive = false
  $scope.markerMapClass = ''
  let savedGMarkers = []
  let gMarkers = []
  // bounds = new google.maps.LatLngBounds();
  $scope.modal
  $scope.description = {}


  mapService.render('markerMap', 2)

  // $scope.$on( '$ionicView.enter', function () {
    $scope.footerActive = false
    resetSearchedPoint()

    // Once markers are retreived from device a new map is rendered
    gMarkersService.allMarkersByCity(city_id).then(markers => {
      let iconImage = {
        url: 'img/Gold_star.png',
        scaledSize: new google.maps.Size(20, 20),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
      }

      //place markers on map
      mapService.placeMarkers(markers.data.markers, 'marker', iconImage)
    })
  // })

  // declare modal
  $ionicModal.fromTemplateUrl('templates/description-modal.html', function(modal) {
    $scope.modal = modal
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  })

  // Watches for fireSearchWithItemDetails to fire, once it does it checks for the object. If there is an object it runs search
  $scope.$watch('mapWatchService.fireSearchWithItemDetails()', newVal => {
    if (typeof newVal === 'object') {
      mapService.search(newVal.formatted_address)
    }
  })


  // retreives lat lng using googles geocode
  $scope.searchMap = function(address) {
    mapService.search(address)
    // resetSearchedPoint()
    // geocoder.geocode({
    //   'address': address
    // }, function(results, status) {
    //   if (status === 'OK') {
    //     let latlng = {
    //       lat: results[0].geometry.location.lat(),
    //       lng: results[0].geometry.location.lng()
    //     }
    //     $scope.updateMap(latlng)
    //   } else {
    //     alert('Geocode was not successful for the following reason: ' + status);
    //   }
    // });
  }

  // updates the map on search
  $scope.updateMap = function(latLng) {

    mapService.updateMap(latlng)
      $scope.footerActive = true
      $scope.changeMapClass()
  }


  // hides and shows the destination Display
  $scope.displayFire = function() {
    $scope.destinationDisplay ? $scope.destinationDisplay = false : $scope.destinationDisplay = true
  }

  $scope.changeMapClass = function() {
    $scope.markerMapClass = 'map-with-destination'
  }

  $scope.cancelSearch = function() {
    $scope.result.location = ''
  }


  $scope.onTextClick = function($event) {
    $event.target.select();
  };

  // $scope.saveLocation = function() {
  //
  //   let lat = mapDetailsService.getSearchItemDetails().geometry.location.lat()
  //   let lng = mapDetailsService.getSearchItemDetails().geometry.location.lng()
  //
  //   gMarkers.pop().setMap(null)
  //
  //   let image = {
  //     url: 'img/Gold_star.png',
  //     scaledSize: new google.maps.Size(20, 20),
  //     origin: new google.maps.Point(0, 0),
  //     anchor: new google.maps.Point(0, 32)
  //   }
  //
  //   let marker = new google.maps.Marker({
  //     position: ({lat,lng}),
  //     map: $scope.markerMap,
  //     icon: image
  //   });
  //
  //   //pushing marker(gmaps formatted) into local array
  //   savedGMarkers.push(marker)
  //   console.log('saved g marker push');
  //
  //   let dbmarker = {
  //     city_id: city_id,
  //     marker_name: $scope.details.name,
  //     marker_description: $scope.description.input,
  //     marker_lat: lat.toString(),
  //     marker_lng: lng.toString()
  //   }
  //   //posting marker(dbase formatted)
  //   gMarkersService.markerPost(city_id, dbmarker).then(result => {
  //     console.log('result from gMarkers Service', result);
  //   })
  // }

  $scope.stopProp = function ($event) {
    $event.stopPropagation()
  }

  function resetSearchedPoint() {
    if (gMarkers.length) {
      gMarkers.pop().setMap(null)
    }
  }

})

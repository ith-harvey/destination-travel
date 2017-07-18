angular.module('starter')

.controller('markerMapCtrl', function($scope, $rootScope, $state, mapDetailsService, gMarkersService, $ionicModal, mapService) {
  $scope.markerAddDisplay = true
  $scope.markerMapClass = 'map-full'
  $scope.markerListClass = 'list-hide'
  $scope.searchBarClass = 'search-show'

  const city_id = $state.params.id
  $scope.mapWatchService = mapService
  $scope.destinationDisplay = false
  $scope.footerActive = false
  $scope.modal
  $scope.description = {}
  $scope.marker = {}
  $scope.markers = []
  $scope.alphabetArr = mapService.getAlphabetArr()


  // declare modal
  $ionicModal.fromTemplateUrl('templates/marker-modal.html', function(modal) {
    $scope.modal = modal
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  })

  


  mapService.render('markerMap', 2)

  // Once markers are retreived from device a new map is rendered
  gMarkersService.allMarkersByCity(city_id).then(markers => {
    let iconImage = {
      url: 'img/Gold_star.png',
      scaledSize: new google.maps.Size(20, 20),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 32)
    }

    //place markers on map
    $scope.markers = markers.data.markers
    mapService.placeMarkers(markers.data.markers, 'marker', iconImage)

    $scope.markers = markers.data.markers.map( (value, index) => {
      value.letter = $scope.alphabetArr[index] +'. '
      return value
    })

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
    $scope.footerActive = true
    $scope.markerMapClass = 'map-with-destination'
    $scope.details = mapDetailsService.getSearchItemDetails()
  }

  // hides and shows the destination Display
  $scope.displayFire = function(marker) {

    if (marker) {
      mapService.getPlaceInfo(marker.marker_place_id, function (place,status) {
        $scope.$apply(function () {
          $scope.details = place
          $scope.details.markerDbObj = marker
              $scope.destinationDisplay ? $scope.destinationDisplay = false : $scope.destinationDisplay = true
        })
      })
    } else {
    $scope.destinationDisplay ? $scope.destinationDisplay = false : $scope.destinationDisplay = true
    }
  }

  // $scope.changeMapClass = function() {
  //   $scope.markerMapClass = 'map-with-destination'
  // }

  $scope.cancelSearch = function() {
    $scope.result.location = ''
  }

  $scope.onTextClick = function($event) {
    $event.target.select();
  };

  $scope.saveLocation = function() {
    mapService.saveLocation('marker', $scope.description.input, city_id)
  }

  $scope.stopProp = function ($event) {
    $event.stopPropagation()
  }

  $scope.markerChangeDisplay = function () {
    if ($scope.markerAddDisplay === false) {
      $scope.markerMapClass = 'map-full'
      $scope.markerListClass = 'list-hide'
      $scope.searchBarClass = 'search-show'
      $scope.markerAddDisplay = true
    } else {
      $scope.markerMapClass = 'map-half'
      $scope.markerListClass = 'list-half'
      $scope.searchBarClass = 'search-hide'
      $scope.markerAddDisplay = false
    }
  }


  $scope.deleteMarker = function (marker) {
    console.log('marker',marker);
    $scope.markers.splice($scope.markers.indexOf(marker),1);
    // mapService.removeMarker()
    gMarkersService.delete(marker.id).then( response => {
      console.log(response);
    })

  }

})

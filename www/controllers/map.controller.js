angular.module('starter')

.controller('markerMapCtrl', function($scope, $rootScope, $state, mapDetailsService, gMarkersService, $ionicModal, mapService) {
  const city_id = $state.params.id
  $scope.mapWatchService = mapService
  $scope.destinationDisplay = false
  $scope.footerActive = false
  $scope.markerMapClass = ''
  $scope.modal
  $scope.description = {}
  $scope.marker = {}


  // declare modal
  $ionicModal.fromTemplateUrl('templates/description-modal.html', function(modal) {
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
    mapService.placeMarkers(markers.data.markers, 'marker', iconImage)
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

  $scope.saveLocation = function() {
    mapService.saveLocation(city_id ,$scope.description.input)
  }

  $scope.stopProp = function ($event) {
    $event.stopPropagation()
  }

})

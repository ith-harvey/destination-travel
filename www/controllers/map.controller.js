angular.module('starter')

.controller('markerMapCtrl', function($scope, $rootScope, $state, mapDetailsService, gMarkersService, $ionicModal, mapService, facebookSearchService, $ionicPopup, tripsService, citiesService) {
  $scope.markerAddDisplay = false
  $scope.markerMapClass = 'map-half'
  $scope.markerListClass = 'list-half'
  $scope.searchBarClass = 'search-hide'
  $scope.footerbarclass = "footer-bar-hide"
  $scope.watchingDetails = mapDetailsService.details

  $scope.watchingDetails.show = false


  const currCity = angular.fromJson($state.params.city)
  $scope.mapWatchService = mapService
  $scope.destinationDisplay = false
  // $scope.footer = {}
  $scope.footeractive = true
  $scope.modal
  $scope.description = {}
  $scope.marker = {}
  $scope.markers = []
  $scope.alphabetArr = mapService.getAlphabetArr()
  $scope.guestMode = facebookSearchService.guestModeActive()
  $scope.trips = []

  init()

  $scope.showImportConfirm = function(trip) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Adopt this city',
      template: 'Do you want to import this city to one of your trips?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        facebookSearchService.duplicateAndSaveCity( currCity, trip.id ).then(result => {
          console.log('the city we just posted!', result.data.trip_city[0].city_id);
          facebookSearchService.duplicateAndSaveMarkers(result.data.trip_city[0].city_id, $scope.markers).then(markerz => {
            $scope.modal.hide()
          })
        }).catch(err => {
          console.log(
            'this is the error',err);
        })
      } else {
        $scope.modal.hide()
        console.log('You are not sure');
      }
    });
  };


  // declare modal
  $ionicModal.fromTemplateUrl('templates/marker-modal.html', function(modal) {
    $scope.modal = modal
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  })

  function init() {
    $scope.footerbarclass = "footer-bar-hide"

    console.log('footer in pageload -->',$scope.footerbarclass);

    mapService.render('markerMap', 11, currCity)

    // Once markers are retreived from device a new map is rendered
    gMarkersService.allMarkersByCity(currCity.city_id).then(markers => {

      // if markers exist, run code
      if(markers.data.markers.length) {
        let iconImage = {
          url: 'img/Gold_Star.png',
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
      }
    })
  }


  $scope.$watch('watchingDetails', function(newVal, oldVal) {
    console.log('firing watch!',newVal);
      if (newVal.show) {
        console.log('what triggers the if!',newVal);
        $scope.searchMap(newVal.tripDetails.formatted_address)
        console.log('search is getting run!');
      }
    }, true)


  // retreives lat lng using googles geocode
  $scope.searchMap = function(address) {
    mapService.search(address)
    $scope.footerbarclass = "footer-bar-show"

    $scope.markerMapClass = 'map-with-destination'
    $scope.details = mapDetailsService.getSearchItemDetails()
  }

  // hides and shows the destination Display
  $scope.displayFire = function(marker) {

    if (marker) {
      mapService.getPlaceInfo(marker.marker_place_id, function (place,status) {
        $scope.$apply(function () {
          $scope.details = place
          console.log($scope.details);
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
    mapService.saveLocation('marker', $scope.description.input, currCity.city_id)
    $scope.description.input = ''
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
      init()
    }
  }


  $scope.deleteMarker = function (marker) {
    console.log('marker',marker);
    $scope.markers.splice($scope.markers.indexOf(marker),1)
    // mapService.removeMarker()
    gMarkersService.delete(marker.id).then( response => {
      console.log(response);
      init()
    })

  }

  $scope.getGuestsTrips = function (markers) {
    console.log('hitting getGuestsTrips');
    tripsService.individualUser().then(trips => {
      console.log('hitting getGuestsTrips',trips.data.trips);
      console.log('hitting getGuestsTrips',trips.data.trips[0]);
      $scope.trips = trips.data.trips
    }).catch(err => {
      console.log(err);
    })
  }

})

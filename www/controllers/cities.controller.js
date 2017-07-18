

angular.module('starter').controller('CitiesCtrl', function($scope, $state, citiesService, SessionsService, mapDetailsService, $ionicModal, mapService) {

  $scope.destinationDisplay = false
  $scope.cityAddDisplay = false
  const alphabetArr = mapService.getAlphabetArr()
  $scope.cities = [];
  $scope.footerActive = false
  $scope.cityMapClass = 'map-half'
  $scope.cityListClass = 'list-half'
  $scope.searchBarClass = 'search-hide'
  $scope.destinationDisplayCity = {}
  $scope.description = {}
  $scope.alphabetArr = mapService.getAlphabetArr()


  // declare modal
  $ionicModal.fromTemplateUrl('templates/city-modal.html', function(modal) {
    $scope.modal = modal
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  })

  citiesService.all().then(cities => {
    $scope.cities = cities.data.trips
  })

  citiesService.allCitiesByTrip($state.params.id).then(cities => {

    //render the map function profile = .render(mapId, mapZoom)
    mapService.render("cityMap",2)

    //set cities(for ng-list & google map)
    mapService.placeMarkers(cities.data.cities,'city')

    $scope.cities = cities.data.cities.map( (value, index) => {
      value.letter = alphabetArr[index] +'. '
      return value
    })
  })

  $scope.searchMap = function(address) {
    mapService.search(address)
    $scope.footerActive = true
    $scope.cityMapClass = 'map-with-destination'
    $scope.googDetails = mapDetailsService.getSearchItemDetails()
  }

  $scope.displayFire = function (city_place_id, city) {
    if (city) {
      $scope.dbDetails = city
    }
    mapService.getPlaceInfo(city_place_id, function (place,status) {
      $scope.$apply(function () {
        $scope.googDetails = place
        $scope.cardDisplayChange()
      })
    })
  }

  $scope.cardDisplayChange = function() {
    $scope.destinationDisplay ? $scope.destinationDisplay = false : $scope.destinationDisplay = true
  }


  $scope.deleteCity = function (city) {
    $scope.cities.splice($scope.cities.indexOf(city),1);
    // mapService.removeMarker()
    citiesService.delete(city.city_id).then( response => {
      console.log(response);
    })
  }

  $scope.cityChangeDisplay = function () {
    if ($scope.cityAddDisplay === false) {
      $scope.cityMapClass = 'map-full'
      $scope.cityListClass = 'list-hide'
      $scope.searchBarClass = 'search-show'
      $scope.cityAddDisplay = true
    } else {
      $scope.cityMapClass = 'map-half'
      $scope.cityListClass = 'list-half'
      $scope.searchBarClass = 'search-hide'
      $scope.cityAddDisplay = false
    }
  }

  $scope.saveCityLocation = function () {

      mapService.saveLocation('city',$scope.description.input,$state.params.id)
  }


})

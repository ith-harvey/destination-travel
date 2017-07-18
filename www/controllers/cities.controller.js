

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

    //place city markers function profile = .placeMarkers(arrayOfCities)

  })

  $scope.searchMap = function(address) {
    mapService.search(address)
    $scope.footerActive = true
    $scope.cityMapClass = 'map-with-destination'
    $scope.details = mapDetailsService.getSearchItemDetails()

  }

  $scope.displayFire = function (city) {
    let city_id
    if (city.city_place_id) {
      city_id = city.city_place_id
    } else {
      city_id = city.place_id
    }
    mapService.getPlaceInfo(city_id, function (place,status) {
      $scope.$apply(function () {
        $scope.details = place
        $scope.destinationDisplayCity.googCityResponse = place
        $scope.destinationDisplayCity.destinationCitydbResponse = city
      })
    })
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


})

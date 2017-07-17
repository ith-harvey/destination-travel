

angular.module('starter').controller('CitiesCtrl', function($scope, $state, citiesService, SessionsService, mapService) {

  $scope.destinationDisplay = false
  const alphabetArr = mapService.getAlphabetArr()
  $scope.cities = [];
  $scope.cityMapClass = 'city-map-half'
  $scope.cityListClass = 'city-list-half'
  $scope.destinationDisplayCity = {}

  citiesService.all().then(cities => {
    $scope.cities = cities.data.trips
  })

  citiesService.allCitiesByTrip($state.params.id).then(cities => {
    console.log('what we get from',cities);

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
    $scope.changeMapClass()
  }

  $scope.changeMapClass = function () {

  }

  // $scope.stopProp = function ($event) {
  //   $event.stopPropagation()
  // }

  $scope.displayFire = function(city, $event) {
    $scope.destinationDisplayCity.currCity = city
    $scope.destinationDisplay ? $scope.destinationDisplay = false : $scope.destinationDisplay = true
    console.log($scope.destinationDisplay, 'is it showing!');
  }

  $scope.alphabetArr = mapService.getAlphabetArr()

})

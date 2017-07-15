

angular.module('starter').controller('CitiesCtrl', function($scope, $state, citiesService, SessionsService, mapService) {

  $scope.cities = [];
  $scope.cityMapClass = 'city-map-half'
  $scope.cityListClass = 'city-list-half'

  citiesService.all().then(cities => {
    $scope.cities = cities.data.trips
  })

  citiesService.allCitiesByTrip($state.params.id).then(cities => {

    //render the map function profile = .render(mapId, mapZoom)
    mapService.render("cityMap",2)

    //set cities(for ng-list & google map)
    $scope.cities = cities.data.cities

    //place city markers function profile = .placeMarkers(arrayOfCities)
    mapService.placeMarkers($scope.cities,'city')

  })

})

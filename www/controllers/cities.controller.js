

angular.module('starter')

.controller('CitiesCtrl', function($scope, $state, citiesService, SessionsService) {
  $scope.cities = [];
  $scope.cityMapClass = 'city-map-half'
  $scope.cityListClass = 'city-list-half'
  $scope.savedCityMarkers = []


  let mapOptions = {
      center: ({lat: 39.82, lng: -95.712}),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    };

  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  citiesService.all().then(cities => {
    console.log(' all cities! --> ', cities);
    $scope.cities = cities.data.trips
  })

  citiesService.allCitiesByTrip($state.params.id).then(cities => {
    console.log('cities! --> ', cities);
    $scope.cities = cities.data.cities

    // place a marker for each city
    $scope.cities.forEach( (city, index) => {
      let latlng = ({lat: Number(city.city_lat), lng: Number(city.city_lng)})
      console.log('index -->',index.toString());
      let marker = new google.maps.Marker({
        position: latlng,
        map: $scope.map,
        label: index.toString()
      });
      $scope.savedCityMarkers.push(marker)
    })

  })




})

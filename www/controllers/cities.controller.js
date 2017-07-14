

angular.module('starter')

.controller('CitiesCtrl', function($scope, $state, citiesService, SessionsService) {
  $scope.cities = [];
  $scope.cityMapClass = 'city-map-half'
  $scope.cityListClass = 'city-list-half'
  let savedCityMarkers = []
  let bounds = new google.maps.LatLngBounds();

  console.log('this is the marker map does it exist?',document.getElementById("markerMap"));

  citiesService.all().then(cities => {
    $scope.cities = cities.data.trips
  })

  citiesService.allCitiesByTrip($state.params.id).then(cities => {

    //load the map
    let mapOptions = {
        center: ({lat: 39.82, lng: -95.712}),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false
      };

    $scope.cityMap = new google.maps.Map(document.getElementById("cityMap"), mapOptions);

    //set the cities for ng-list
    $scope.cities = cities.data.cities
  //
  //   // place a marker for each city
    $scope.cities.forEach( (city, index) => {
      let latlng = ({lat: Number(city.city_lat),lng: Number(city.city_lng)})

      let marker = new google.maps.Marker({
        position: latlng,
        map: $scope.cityMap,
        animation: google.maps.Animation.DROP,
        label: index.toString()
      });

      bounds.extend(latlng);
      savedCityMarkers.push(marker)
    })
    $scope.cityMap.fitBounds(bounds)
  })




})

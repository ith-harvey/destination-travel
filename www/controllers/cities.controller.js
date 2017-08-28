
angular.module('starter').controller('CitiesCtrl', function($scope, $state, citiesService, SessionsService, mapDetailsService, $ionicModal, mapService, $timeout, facebookSearchService, $rootScope) {

  $scope.destinationDisplay = false
  $scope.cityAddDisplay = false
  const alphabetArr = mapService.getAlphabetArr()
  $scope.cities = [];
  $scope.cityMapClass = 'map-half'
  $scope.cityListClass = 'list-half'
  $scope.searchBarClass = 'search-hide'
  $scope.footerbarclass = "footer-bar-hide"
  $scope.watchingDetails = mapDetailsService.details
  $scope.watchingDetails.show = false

  $scope.destinationDisplayCity = {}
  $scope.description = {}
  $scope.alphabetArr = mapService.getAlphabetArr()
  $scope.guestMode = facebookSearchService.guestModeActive()

  // init()

  $rootScope.$on('$ionicView.enter', function (event, data) {
    init()
  })

  // declare modal
  $ionicModal.fromTemplateUrl('templates/city-modal.html', function(modal) {
    $scope.modal = modal
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  })

  function init () {

    $scope.footerbarclass = "footer-bar-hide"
    // citiesService.all().then(cities => {
    //   console.log('cities',cities);
    //   $scope.cities = cities.data.trips
    // })

    citiesService.allCitiesByTrip($state.params.id).then(cities => {
      console.log('cities --->', cities);

      //render the map function profile = .render(mapId, mapZoom)
      mapService.render("cityMap",2)

      //set cities(for ng-list & google map)
      mapService.placeMarkers(cities.data.compiledCities,'city')

      $scope.cities = cities.data.compiledCities.map( (value, index) => {
        value.letter = alphabetArr[index] +'. '
        return value
      })

    })

  }

  $scope.$watch('watchingDetails', function(newVal, oldVal) {
      if (newVal.show) {
        $scope.searchMap(newVal.tripDetails.formatted_address)
        console.log('search is getting run!');
      }
    }, true)

  $scope.searchMap = function(address) {
    mapService.search(address)
    $scope.footerbarclass = "footer-bar-show"
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
    citiesService.delete(city.city_id).then( response => {
      console.log(response);
      init()
    })
  }

  $scope.cityChangeDisplay = function () {
    if ($scope.cityAddDisplay === false) {
      $scope.cityMapClass = 'map-full'
      $scope.cityListClass = 'list-hide'
      $scope.searchBarClass = 'search-show'
      $scope.footerbarclass = "footer-bar-hide"
      $scope.cityAddDisplay = true

    } else {
      $scope.cityMapClass = 'map-half'
      $scope.cityListClass = 'list-half'
      $scope.searchBarClass = 'search-hide'
      $scope.footerbarclass = "footer-bar-hide"
      $scope.cityAddDisplay = false
      init()
    }
  }

  $scope.saveCityLocation = function () {
      mapService.saveLocation('city', $scope.description.input, $state.params.id)
      $scope.description.input = ''
  }

  $scope.stopProp = function ($event) {
    $event.stopPropagation()
  }

  $scope.sendToMarkerMap = function (city) {
    city = angular.toJson(city);
    $state.go('app.markerMap', {city: city})
  }



})

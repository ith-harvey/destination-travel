

angular.module('starter')

.controller('TripsCtrl', function($scope, tripsService, SessionsService, $ionicModal, mapService, loginService) {
  $scope.trips = [];
  $scope.tripInput = {}
  $scope.cityInput = {}



  init()

  // initialize modal

  $scope.logThings = function() {
    console.log('result tracked');
  }

  $scope.createTrip = function () {

    let tripObj = {
      trip_name: $scope.tripInput.name,
      trip_description: $scope.tripInput.description,
    }

    //post to trip
    tripsService.post(tripObj).then( response => {

      //post first city to trip with new trip id
      mapService.saveLocation('city',$scope.cityInput.description,response.data.trips[0].id).then(result => {
        console.log('final retun of zi promises -->', result);
        $scope.tripInput = {}
        $scope.cityInput = {}
        init()
      })
    })
  }

  $scope.deleteTrip = function (trip) {
    console.log('trip -->',trip);
    $scope.trips.splice($scope.trips.indexOf(trip),1)
    tripsService.deleteTrip(trip.id).then(response => {
      console.log('response form delete',response);
    })
  }


  function init() {
    tripsService.individualUser().then(trips => {
      $scope.trips = trips.data.trips

    })

  }


})

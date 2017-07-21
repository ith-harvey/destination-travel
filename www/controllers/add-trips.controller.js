

angular.module('starter')

.controller('AddTripsCtrl', function($scope, tripsService, SessionsService, $ionicModal, mapService, loginService, $state) {
  $scope.trips = [];
  $scope.tripInput = {}
  $scope.cityInput = {}

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
      mapService.saveLocation('city',$scope.cityInput.description,response.data.trips[0].id)
        $scope.tripInput = {}
        $scope.cityInput = {}
        $state.go('app.trips')
    })
  }

})

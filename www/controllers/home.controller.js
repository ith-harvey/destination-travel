
angular.module('starter').controller('home', function($scope, tripsService, $ionicModal, SessionsService, mapService, facebookSearchService, $state) {
  $scope.tripInput = {}
  $scope.cityInput = {}

/// USER NEEDS TO BE LOGGED IN!

  $scope.createTrip = function () {

    let tripObj = {
      trip_name: $scope.tripInput.name,
      trip_description: $scope.tripInput.description,
      user_id: SessionsService.user.id
    }

    //post to trip
    tripsService.post(tripObj,SessionsService.user.id).then( response => {
      //post first city to trip with new trip id
      mapService.saveLocation('city',$scope.cityInput.description,response.data.trips[0].id)
        $scope.tripInput = {}
        $scope.cityInput = {}
    })
  }

  $scope.goToFBCities = function () {
    facebookSearchService.setGuestMode(true)
    $state.go('app.fbfriendscities')
  }

  $scope.goToPersonalTrips = function () {
    facebookSearchService.setGuestMode(false)
    $state.go('app.trips')
  }


})

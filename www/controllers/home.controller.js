
angular.module('starter').controller('home', function($scope, tripsService, $ionicModal, SessionsService, mapService) {
  $scope.tripInput = {}
  $scope.cityInput = {}

  $ionicModal.fromTemplateUrl('templates/trip-modal.html', function(modal) {
    $scope.modal = modal
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  })

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

})

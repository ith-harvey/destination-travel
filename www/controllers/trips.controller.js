

angular.module('starter')

.controller('TripsCtrl', function($scope, tripsService, SessionsService) {
  $scope.trips = [];
  tripsService.individualUser(SessionsService.user.id).then(trips => {
    console.log('trips! --> ', trips);
    $scope.trips = trips.data.trips
  })




})

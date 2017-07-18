

angular.module('starter')

.controller('TripsCtrl', function($scope, tripsService, SessionsService) {
  $scope.trips = [];
  tripsService.individualUser(SessionsService.user.id).then(trips => {
    $scope.trips = trips.data.trips
  })




})

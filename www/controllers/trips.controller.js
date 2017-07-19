

angular.module('starter')

.controller('TripsCtrl', function($scope, tripsService, SessionsService, $ionicModal) {
  $scope.trips = [];

  // initialize modal
  $ionicModal.fromTemplateUrl('templates/trip-modal.html', function(modal) {
    $scope.modal = modal
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  })

  // $scope.createTrip = funciton () {
  //
  //
  // }

  tripsService.individualUser(SessionsService.user.id).then(trips => {
    $scope.trips = trips.data.trips

  })




})

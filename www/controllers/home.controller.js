
angular.module('starter').controller('home', function($scope, tripsService, $ionicModal, SessionsService) {
  $scope.tripInput = {}

  $ionicModal.fromTemplateUrl('templates/trip-modal.html', function(modal) {
    $scope.modal = modal
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  })

/// USER NEEDS TO BE LOGGED IN!

  $scope.createTrip = function () {
    console.log('session service!', SessionsService.user);
    let tripObj = {
      trip_name: $scope.tripInput.name,
      trip_description: $scope.tripInput.description,
      user_id: SessionsService.user.id
    }
    console.log('this is the trip!',tripObj);

    tripsService.post(tripObj,SessionsService.user.id)
  }

})

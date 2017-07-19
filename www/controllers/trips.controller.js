

angular.module('starter')

.controller('TripsCtrl', function($scope, tripsService, SessionsService, $ionicModal, mapService) {
  $scope.trips = [];
  $scope.tripInput = {}
  $scope.cityInput = {}

  init()

  // initialize modal
  $ionicModal.fromTemplateUrl('templates/trip-modal.html', function(modal) {
    $scope.modal = modal
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true,
    scope: $scope
  })

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
        init()
    })
  }



  function init() {
    tripsService.individualUser(SessionsService.user.id).then(trips => {
      $scope.trips = trips.data.trips

    })
  }


})

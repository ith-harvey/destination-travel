

angular.module('starter')

.controller('TripsCtrl', function($scope, tripsService, SessionsService, $ionicModal, mapService, loginService) {
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
    }

    //post to trip
    tripsService.post(tripObj).then( response => {

      //post first city to trip with new trip id
      mapService.saveLocation('city',$scope.cityInput.description,response.data.trips[0].id)
        $scope.tripInput = {}
        $scope.cityInput = {}
        init()
    })
  }

  $scope.deleteTrip = function (trip) {
    console.log('trip -->',trip);
    $scope.trips.splice($scope.trips.indexOf(trip),1)
    tripsService.deleteTrip(trip.id).then(response => {
      console.log('response form delete',response);
    })
  }

// loginService.getUser()
  function init() {
    tripsService.individualUser().then(trips => {
      $scope.trips = trips.data.trips

    })
  }


})

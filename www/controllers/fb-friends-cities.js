
angular.module('starter')

.controller('fbFriendsCitiesCtrl', function($scope, tripsService, $ionicModal, mapService, facebookSearchService) {

  $scope.cities = [];

  init()

  function init() {
    facebookSearchService.fbFriendsCities().then(result => {
      console.log('result of fb friends back from db -->', result);
      console.log('result of fb friends back from db -->',result.data);
      console.log('result of fb friends back from db -->',result.summary);

    })
  }


})

angular.module('starter')

.controller('loginCtrl', function($scope, $state, $ionicModal, $timeout, $cordovaOauth,loginService) {

  $scope.user = {};

  $scope.login = function () {
    loginService.login($scope.user).then(result => {
      console.log(result.data);
      loginService.store(result.data.token)
      $state.go('app.home')
    })
  }

})

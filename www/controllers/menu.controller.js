angular.module('starter.controllers',['ngCordovaOauth', 'ngAutocomplete', 'ngDisabletap', 'ngOnenter', 'selectAllInInput'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaOauth,loginService, $state) {

  $scope.logOut = function () {
    loginService.logout()
    $state.go('login')
  }


})

angular.module('starter.controllers',['ngCordovaOauth', 'ngAutocomplete', 'ngDisabletap', 'ngOnenter', 'selectAllInInput'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaOauth,loginService) {

  $scope.logOut = function () {
    loginService.logout()
  }
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
})

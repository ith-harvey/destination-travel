angular.module('starter')

.controller('loginCtrl', function($scope, $state, $ionicModal, $timeout, $cordovaOauth,loginService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Triggered in the login modal to close it

  // Open the login modal

  $scope.doLogin = function() {
    // retreives session / cookie
    loginService.createSession($scope.loginData.username, $scope.loginData.password).then( sessionResult => {
      console.log(sessionResult.data.user.id);

      //logs user in and returns session
      loginService.attemptLogin(sessionResult.data.user.id).then( loginResult => {
        console.log('login Result -->',loginResult);
        $state.go('app.home')
      })
    })
  };

  // Perform the login action when the user submits the login form
  $scope.facebookLogin = function() {

    $cordovaOauth.facebook('1981517632083291',['email', 'user_relationships']).then(function(result) {
      console.log("Response Object -> " + JSON.stringify(result));
      }, function(error) {
      console.log("Error -> " + error);
    })

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  };

})

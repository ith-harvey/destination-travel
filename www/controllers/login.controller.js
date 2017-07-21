angular.module('starter')

.controller('loginCtrl', function($scope, $state, $ionicModal, $timeout, $cordovaOauth,loginService) {

  $scope.user = {};
  let fbaccess_token
  console.log('loginCTRl is attached');


  $scope.login = function () {
    loginService.login($scope.user).then(result => {
      console.log(result.data);
      loginService.saveUser(result.data.user_id)
      loginService.store(result.data.token)
      $state.go('app.home')
    })
  }

  $scope.fbLogin = function() {
    console.log('hitting it fb');
        $cordovaOauth.facebook("1981517632083291", ["email","user_relationships", "user_about_me"]).then(function(result) {
          console.log('here is our token -->',result.access_token)
            loginService.fbLogin(result).then(result => {
              console.log('result from our servers FB login -->', result);

            })
        }, function(error) {
            console.log(error);
        });
    }



})

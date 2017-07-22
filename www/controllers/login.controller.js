angular.module('starter')

.controller('loginCtrl', function($scope, $state, $ionicModal, $timeout, $cordovaOauth,loginService, facebookSearchService) {

  $scope.user = {
    email: 'ian@gmail.com',
    password: 'ian',
  }

  let fbaccess_token
  console.log('loginCTRl is attached');


  $scope.login = function () {
    loginService.login($scope.user).then(result => {
      console.log(result.data);
      loginService.store(result.data.token)
      $state.go('app.home')
    })
  }

  $scope.fbLogin = function() {
        $cordovaOauth.facebook("1981517632083291", ["email", "user_about_me","user_friends","public_profile"]).then(function(result) {
          facebookSearchService.storeFbAccToken(result)

            loginService.fbLogin(result).then(resultFromDb => {
              console.log('result from our servers FB login -->', resultFromDb.data.token);
              loginService.store(resultFromDb.data.token)
              $state.go('app.home')

            })
        }, function(error) {
            console.log('fb error -->',error);
        });
    }



})


angular.module('starter')
.controller('signUpCtrl', function($scope, UsersService, loginService) {
  $scope.loginData = {}

  $scope.doSignUp = function() {

    if($scope.loginData.password === $scope.loginData.doublecheckpassword) {
      let user = {
        email: $scope.loginData.email,
        password: $scope.loginData.password,
        first_name: $scope.loginData.first_name,
        last_name: $scope.loginData.last_name,
      }

      UsersService.create(user).then( result => {
        console.log('posted user', result);

        loginService.createSession(user.email, user.password).then( sessionResult => {

          //logs user in and returns session
          loginService.attemptLogin(sessionResult.data.user.id).then( loginResult => {
            console.log('login Result -->',loginResult);
            $state.go('app.home')
          })
        })
      })
    }
  }
})

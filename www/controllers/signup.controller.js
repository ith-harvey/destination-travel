
angular.module('starter')
.controller('signUpCtrl', function($scope, UsersService, loginService) {
  $scope.user = {}

  $scope.doSignUp = function() {
    if($scope.user.doublecheckpassword === $scope.user.password) {
      loginService.signUp($scope.user).then(result => {
        console.log('result from signup', result);
        authService.store(result.data.token)
        $state.go('app.home')
      })
    } else{
      console.error('the passwords did not match!');
    }
  }
})

(function() {
  angular.module('starter').run(run)

  run.$inject = ['$rootScope', '$state', 'SessionsService', '$ionicViewSwitcher','$ionicHistory', 'loginService']

  function run ($rootScope, $state, SessionsService, $ionicViewSwitcher, $ionicHistory, loginService) {

    $rootScope.goBackState = function() {
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.goBack();
      
    }

    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {

      if (!loginService.loadUserCredentials() && toState.requiresLogin) {
        console.log('no credentials!');
        var notification = 'You cannot access that page without logging in.'
        evt.preventDefault();
        $state.go('login', {notification: notification});
      }
    });


  }
}());

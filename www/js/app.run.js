(function() {
  angular.module('starter').run(run)

  run.$inject = ['$rootScope', '$state', 'SessionsService', '$ionicViewSwitcher','$ionicHistory' ]

  function run ($rootScope, $state, SessionsService, $ionicViewSwitcher, $ionicHistory) {

    $rootScope.goBackState = function() {
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.goBack();
    }

    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
      var user = SessionsService.user

      SessionsService.refresh()



      if (toState.requiresLogin && !user.id) {
        var notification = 'You cannot access that page without logging in.'
        evt.preventDefault()
        return $state.go('login', { notification: notification });
      }

      // if (toState.name === 'app.cities' ) {
      //
      // }

    });
  }
}());

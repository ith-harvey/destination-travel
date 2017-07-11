(function() {
  angular.module('starter').run(run)

  run.$inject = ['$rootScope', '$state', 'SessionsService']

  function run ($rootScope, $state, SessionsService) {
    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
      var user = SessionsService.user

      SessionsService.refresh()
      if (toState.requiresLogin && !user.id) {
        var notification = 'You cannot access that page without logging in.'
        evt.preventDefault()
        return $state.go('app.login', { notification: notification });
      }
    });
  }
}());

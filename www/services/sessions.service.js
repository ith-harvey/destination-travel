(function() {
  angular.module('starter')
    .service('SessionsService', service)

  service.$inject = ['BASE_URL', '$http']
  function service (BASE_URL, $http) {
    var sessionService = this
    sessionService.user = {}

    sessionService.refresh = function () {
      return $http.get(`${BASE_URL}/sessions/refresh`).then(function (result) {
        var response = result.data
        response ? sessionService.user = response.user : sessionService.user = {}
      })
    }

    sessionService.login = function (user) {
      var body = { email: user.email, password: user.password }

      return $http.post(`${BASE_URL}/sessions`, body)
        .then(function (result) {
          sessionService.user = result.data.user
          return sessionService.user
        })
    }

    sessionService.logout = function () {
      sessionService.user = {}
      return $http.delete(`${BASE_URL}/sessions`)
    }
  }
}());

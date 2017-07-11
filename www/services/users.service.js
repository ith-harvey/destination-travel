(function() {
  angular.module('starter')
    .service('UsersService', service)

    service.$inject = ['BASE_URL', '$http']
    function service (BASE_URL, $http) {
    this.create = function (user) {
      var body = { email: user.email, password: user.password }

      return $http.post(`${BASE_URL}/users`, body)
    }

    this.show = function (id) {
      return $http.get(`${BASE_URL}/users/${id}`)
    }
  }
}());

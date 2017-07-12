(function() {
  angular.module('starter')
    .service('UsersService', service)

    service.$inject = ['BASE_URL', '$http']

    function service (BASE_URL, $http) {

      this.create = function (user) {
        console.log('user --> ', user);
        return $http.post(`${BASE_URL}/users`, user)
      }

      this.show = function (id) {
        return $http.get(`${BASE_URL}/users/${id}`)
      }
  }
}());

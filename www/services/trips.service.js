(function() {
  angular.module('starter')
    .service('tripsService', service)

    service.$inject = ['BASE_URL', '$http']

    function service (BASE_URL, $http) {
      const tripsService = this

      tripsService.all = function () {
        return $http.get(`${BASE_URL}/trips/`)
      }

      tripsService.individualUser = function (userId) {
        console.log('user id --> ', userId);
        return $http.get(`${BASE_URL}/trips/users/${userId}`)
      }

      tripsService.show = function (id) {
        return $http.get(`${BASE_URL}/trips/${id}`)
      }

      tripsService.post = function (object,userId) {
        console.log('in post');
        return $http.post(`${BASE_URL}/trips`, object)
      }
  }
}());

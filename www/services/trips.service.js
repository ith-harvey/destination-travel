(function() {
  angular.module('starter')
    .service('tripsService', service)

    service.$inject = ['BASE_URL', '$http']

    function service (BASE_URL, $http) {
      const tripsService = this

      tripsService.all = function () {
        return $http.get(`${BASE_URL}/trips/`)
      }

      tripsService.individualUser = function () {
        return $http.get(`${BASE_URL}/trips/users`)
      }

      tripsService.show = function (id) {
        return $http.get(`${BASE_URL}/trips/${id}`)
      }

      tripsService.post = function (object) {
        return $http.post(`${BASE_URL}/trips`, object)
      }

      tripsService.deleteTrip = function (tripId) {
        console.log('in delete');
        return $http.delete(`${BASE_URL}/trips/${tripId}`)
      }
  }
}());

(function() {
  angular.module('starter')
    .service('citiesService', service)

    service.$inject = ['BASE_URL', '$http']

    function service (BASE_URL, $http) {
      const citiesService = this

      citiesService.all = function () {
        return $http.get(`${BASE_URL}/cities`)
      }

      citiesService.allCitiesByTrip = function (tripId) {
        console.log('trip id --> ', tripId);
        return $http.get(`${BASE_URL}/cities/trips/${tripId}`)
      }

      citiesService.show = function (id) {
        return $http.get(`${BASE_URL}/trips/${id}`)
      }
  }
}());

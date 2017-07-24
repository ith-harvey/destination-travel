(function() {
  angular.module('starter').service('citiesService', service)

    service.$inject = ['BASE_URL', '$http']

    function service (BASE_URL, $http) {
      const citiesService = this

      citiesService.all = function () {
        return $http.get(`${BASE_URL}/cities`)
      }

      citiesService.allCitiesByTrip = function (tripId) {
        return $http.get(`${BASE_URL}/cities/trips/${tripId}`)
      }

      citiesService.postMarker = function (tripId, data) {
        return $http.post(`${BASE_URL}/cities/trips/${tripId}`, data)
      }

      citiesService.delete = function (cityId) {
        return $http.delete(`${BASE_URL}/cities/${cityId}`)
      }

  }
}());

(function() {
  angular.module('starter')
    .service('gMarkersService', service)

    service.$inject = ['BASE_URL', '$http']

    function service (BASE_URL, $http) {
      let savedMarkers = []

      const gMarkersService = this

      gMarkersService.saveMarker = function (marker) {
        savedMarkers.push(marker)
      }

      gMarkersService.getMarkers = function () {
        return savedMarkers
      }

      gMarkersService.all = function () {
        return $http.get(`${BASE_URL}/markers`)
      }

      gMarkersService.allMarkersByCity = function (cityId) {
        console.log('city id --> ', cityId);
        return $http.get(`${BASE_URL}/markers/cities/${cityId}`)
      }

      gMarkersService.show = function (id) {
        return $http.get(`${BASE_URL}/trips/${id}`)
      }

      gMarkersService.markerPost = function (cityId, savedMarker) {
        console.log(savedMarker);
      return $http({url: `${BASE_URL}/markers/cities/${cityId}`, method: "POST", data: { 'savedMarker' : savedMarker }
        })

      }
  }
}());

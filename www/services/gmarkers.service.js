(function() {
  angular.module('starter')
    .service('gMarkersService', service)

    service.$inject = ['BASE_URL', '$http']

    function service (BASE_URL, $http) {
      const gMarkersService = this

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

      gMarkersService.markerDelete = function (markerId) {
        console.log(markerId);
        return $http.delete(`${BASE_URL}/markers/${savedMarker.id}`)
      }
    }
}());

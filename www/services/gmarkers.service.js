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
        return $http.get(`${BASE_URL}/markers/cities/${cityId}`)
      }

      gMarkersService.show = function (id) {
        return $http.get(`${BASE_URL}/trips/${id}`)
      }

      gMarkersService.markerPost = function (cityId, savedMarker) {
        console.log('posting marker', cityId);
        return $http({url: `${BASE_URL}/markers/cities/${cityId}`, method: "POST", data: { 'savedMarker' : savedMarker }
        })
      }

      gMarkersService.delete = function (markerId) {
        console.log('markerid',markerId);
        return $http.delete(`${BASE_URL}/markers/${markerId}`)
      }
    }
}());

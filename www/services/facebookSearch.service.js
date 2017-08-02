angular.module('starter').service('facebookSearchService', facebookSearchService)

  loginService.$inject = ['$http','BASE_URL', 'citiesService', 'gMarkersService']

  function facebookSearchService($http, BASE_URL, citiesService, gMarkersService) {
    const vm = this
    let fbAccessToken
    let guestMode = false

    vm.fbFriendsCities = function () {
      console.log('hitting friends cities');
      return $http.post(`${BASE_URL}/cities/fbfriends`, vm.getFbAccToken())
    }

    vm.storeFbAccToken = function (fbToken) {
      console.log('fb token getting stored -->', fbToken);
      fbAccessToken = fbToken
    }

    vm.guestModeActive = function () {
      return guestMode
    }

    vm.setGuestMode = function (bool) {
      guestMode = bool
    }

    vm.getFbAccToken = function () {
      // run a check here if we need to refresh token
      return fbAccessToken
    }

    vm.duplicateAndSaveCity = function (city,tripId) {
      delete city.id
      delete city.trip_name
      delete city.trip_id
      delete city.user_id
      delete city.city_id
      delete city.created_at
      delete city.updated_at
      delete city.trip_description
      delete city.letter
      delete city.marker_count
      return citiesService.postMarker(tripId,city)
    }

    vm.duplicateAndSaveMarkers = function (cityId, markers) {
      console.log('marker--->', cityId);
    let postReturn = markers.map( marker => {
        delete marker.id
        delete marker.created_at
        delete marker.updated_at
        delete marker.letter
        marker.city_id = cityId
        return gMarkersService.markerPost(cityId, marker)
      })
    return Promise.all(postReturn)
    }

  }

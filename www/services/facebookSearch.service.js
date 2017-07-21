angular.module('starter').service('facebookSearchService', facebookSearchService)

  loginService.$inject = ['$http','BASE_URL']

  function facebookSearchService($http, BASE_URL) {
    const vm = this
    let fbAccessToken

    vm.fbFriendsCities = function () {
      console.log('hitting friends cities');
      return $http.post(`${BASE_URL}/cities/fbfriends`, vm.getFbAccToken())
    }

    vm.storeFbAccToken = function (fbToken) {
      console.log('fb token getting stored -->', fbToken);
      fbAccessToken = fbToken
    }

    vm.getFbAccToken = function () {
      // run a check here if we need to refresh token
      return fbAccessToken
    }

  }

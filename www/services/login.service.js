angular.module('starter').service('loginService', loginService)

  loginService.$inject = ['$http']

  function loginService($http) {
    const vm = this

    vm.facebookLogin = function () {
      const rootURL = 'http://localhost:3000'
      const url = `${rootURL}/users/auth/facebook`
      return $http.get(url)
    }
  }

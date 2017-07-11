angular.module('starter').service('loginService', loginService)

  loginService.$inject = ['$http','BASE_URL']

  function loginService($http, BASE_URL) {
    const vm = this

    // vm.facebookLogin = function () {
    //   // return $auth.authenticate('facebook')
    //   // const rootURL = 'http://localhost:3000'
    //   // const url = `${rootURL}/users/auth/facebook`
    //   return $http.get(url)
    // }

    vm.attemptLogin = function (id) {
      const url = `${BASE_URL}/users/${id}`
      return $http.get(url)
    }

    vm.createSession = function (email, password) {
      console.log('in create Session');
      const url = `${BASE_URL}/sessions/`
      const data = { email, password }
      return $http.post(url, data)
    }

  }

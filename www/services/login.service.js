angular.module('starter').service('loginService', loginService)

  loginService.$inject = ['$http']

  function loginService($http) {
    const vm = this

    vm.facebookLogin = function () {
      // return $auth.authenticate('facebook')
      // const rootURL = 'http://localhost:3000'
      // const url = `${rootURL}/users/auth/facebook`
      return $http.get(url)
    }

    vm.attemptLogin = function (id) {
      const rootURL = 'http://localhost:3000'
      const url = `${rootURL}/users/${id}`
      return $http.get(url)
    }

    vm.createSession = function (email, password) {
      console.log('in create Session');
      const rootURL = 'http://localhost:3000'
      const url = `${rootURL}/sessions/`
      const data = { email, password }
      return $http.post(url, data)
    }

  }

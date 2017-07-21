angular.module('starter').service('loginService', loginService)

  loginService.$inject = ['$http','BASE_URL']

  function loginService($http, BASE_URL) {
    const vm = this
    const tokenKey = 'Bee-RR-Tolken'
    let isAuthenticated = false
    let authToken
    let currUserId


    vm.signUp = function(user) {
      return $http.post(`${BASE_URL}/users/signup`, user)
    }

    vm.login = function(user) {
      return $http.post(`${BASE_URL}/jwebt/login`, user)
    }

    vm.logout = function () {
      authToken = undefined
      isAuthenticated = false
      $http.defaults.headers.common.Authorization = undefined
      window.localStorage.removeItem(tokenKey)
    }

    vm.store = function (token) {
      window.localStorage.setItem(tokenKey, token)
      vm.useCredentials(token)
    }

    vm.useCredentials = function (token) {
      isAuthenticated = true
      authToken = token

      // sets token as the header of all requests
      // $http.defaults.headers.common.Authorization = 'Bearer: ' + authToken

      $http.defaults.headers.common.Authorization = authToken
      return isAuthenticated
    }

    vm.loadUserCredentials = function () {
      let token = window.localStorage.getItem(tokenKey)
      if (token) {
        vm.useCredentials(token)
      } else {
        isAuthenticated = false
      }
      return isAuthenticated
    }

    ////// facebook related functions //////
    vm.fbLogin = function(fbtoken) {
      return $http.post(`${BASE_URL}/jwebt/fblogin`, fbtoken)
    }

    vm.loadUserCredentials()

  }

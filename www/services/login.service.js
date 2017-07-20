angular.module('starter').service('loginService', loginService)

  loginService.$inject = ['$http','BASE_URL']

  function loginService($http, BASE_URL) {
    const vm = this
    const tokenKey = 'Bee-RR-Tolken'
    let isAuthenticated = false
    let authToken
    let currUserId



    // vm.facebookLogin = function () {
    //   // return $auth.authenticate('facebook')
    //   // const rootURL = 'http://localhost:3000'
    //   // const url = `${rootURL}/users/auth/facebook`
    //   return $http.get(url)
    // }

    vm.signUp = function(user) {
      return $http.post(`${BASE_URL}/users/signup`, user)
    }

    vm.login = function(user) {
      return $http.post(`${BASE_URL}/jwebt/login`, user)
    }

    vm.logout = function () {
      console.log('logging out');
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

    vm.saveUser = function (id) {
      currUserId = id
    }

    vm.getUser = function () {
      return currUserId
    }

    vm.loadUserCredentials()

  }

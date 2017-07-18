angular.module('starter').service('mapDetailsService', mapDetailsService)

  mapDetailsService.$inject = ['$cordovaGeolocation']

  function mapDetailsService($cordovaGeolocation, searchMap) {
    const vm = this
    vm.details = ''

    vm.getSearchItemDetails = function () {
      return vm.details
    }


    vm.fireSearchWithItemDetails = function () {
      return vm.details
    }

    vm.saveSearchItemDetails = function (details) {
      vm.details = details
      vm.fireSearchWithItemDetails()
    }

    vm.runSearch = function (address,searchMap) {
      searchMap(address)
    }
  }

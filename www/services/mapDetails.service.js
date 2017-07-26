angular.module('starter').service('mapDetailsService', mapDetailsService)

  mapDetailsService.$inject = ['$cordovaGeolocation']

  function mapDetailsService($cordovaGeolocation, searchMap) {
    const vm = this
    vm.details = { show: false }

    vm.getSearchItemDetails = function () {
      return vm.details.tripDetails
    }

    vm.fireSearchWithItemDetails = function () {
      return vm.details.tripDetails
    }

    vm.saveSearchItemDetails = function (details) {
      vm.details.tripDetails = details
      vm.details.show = true
      vm.fireSearchWithItemDetails()
    }

    vm.runSearch = function (address,searchMap) {
      searchMap(address)
    }
  }

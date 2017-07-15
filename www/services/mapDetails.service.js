angular.module('starter').service('mapDetailsService', mapDetailsService)

  mapDetailsService.$inject = ['$cordovaGeolocation']

  function mapDetailsService($cordovaGeolocation, searchMap) {
    const vm = this
    vm.details = ''

    vm.getSearchItemDetails = function () {
      console.log('in getSearchItemDetails');
      return vm.details
    }

    vm.fireSearchWithItemDetails = function () {
      return vm.details
    }

    vm.saveSearchItemDetails = function (details) {
      console.log('saving the details right quick');
      vm.details = details
      vm.fireSearchWithItemDetails()
    }

    vm.runSearch = function (address,searchMap) {
      searchMap(address)
    }
  }

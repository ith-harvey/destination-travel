angular.module('starter').service('mapService', mapService)

  mapService.$inject = ['$cordovaGeolocation']

  function mapService($cordovaGeolocation, searchMap) {
    const vm = this
    vm.details = ''

    vm.getSearchItemDetails = function () {
      console.log('getSearchItemDetails is run');
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

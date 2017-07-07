angular.module('starter').service('mapService', mapService)

  loginService.$inject = []

  function mapService() {
    const vm = this
    vm.details = ''

    vm.getSearchItemDetails = function () {
      return vm.details
    }

    vm.saveSearchItemDetails = function (details) {
      vm.details = details
    }

  }

(function() {
  angular.module('starter')
    .service('initiateMapRender', service)

    service.$inject = []

    function service () {
      initiateMapRender = this

      initiateMap.render = funciton () {
        let mapOptions = {
          center: ({
            lat: 39.82,
            lng: -95.712
          }),
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false
        };

        $scope.markerMap = new google.maps.Map(document.getElementById("markerMap"), mapOptions);

      }

    }
}());

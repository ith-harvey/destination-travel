

angular.module('starter').controller('MapCtrl', function($scope, $rootScope, $state, $cordovaGeolocation,mapService) {
  let options = {timeout: 10000, enableHighAccuracy: true};
  let geocoder = new google.maps.Geocoder();

  // $scope.result = {}
  // $scope.$watch('result.location', (newValue, oldValue) => {
  //   console.log('!!', newValue, oldValue)
  // })

  $scope.updateMap = function (latLng) {
    $scope.map.setCenter(latLng)
    console.log('logging that good good',mapService.getSearchItemDetails());
  }


  $scope.search = function (address) {

    console.log('this is what is passed in', address);
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === 'OK') {
        $scope.updateMap(results[0].geometry.location)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    let marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
    });

    }, function(error){
      console.log("Could not get location");
    }
  )

})

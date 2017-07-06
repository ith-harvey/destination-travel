

angular.module('starter').controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  let options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let mapOptions = {
        center: latLng,
        zoom: 15,
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

  
  console.log('result1!',$scope.result1)



})

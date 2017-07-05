

angular.module('starter').controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
    });

    }, function(error){
      console.log("Could not get location");
    }
  )

    console.log($scope.angSearchBox);
    // var searchBox = new google.maps.places.SearchBox($scope.angSearchBox);
    //   $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);





})

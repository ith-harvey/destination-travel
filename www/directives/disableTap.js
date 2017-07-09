angular.module( "ngDisabletap", []).directive('ngDisabletap', function($timeout) {
  return {
    link: function() {
      $timeout(function() {
        let container = document.getElementsByClassName('pac-container');
        // disable ionic data tab
        angular.element(container).attr('data-tap-disabled', 'true');
        // leave input field if gdoogle-address-entry is selected
        angular.element(container).on("click", function(){
            console.log('onclick ran');
            document.getElementById('type-selector').blur();
        });

      },500);

    }
  };
});

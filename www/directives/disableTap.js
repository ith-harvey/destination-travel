angular.module( "ngDisabletap", []).directive('ngDisabletap', function($timeout) {
  console.log('we are attached');
  return {
    link: function() {
      $timeout(function() {
        let container = document.getElementsByClassName('pac-container');
        console.log(container);
        console.log('by id',document.getElementById('pac-container'));
        // disable ionic data tab
        angular.element(container).attr('data-tap-disabled', 'true');
        // leave input field if gdoogle-address-entry is selected
        angular.element(container).on("click", function(){
            document.getElementById('type-selector').blur();
        });

      },500);

    }
  };
});

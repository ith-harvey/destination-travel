

angular.module( "ngOnenter", []).directive('ngOnenter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
              scope.$apply(function (){
                  scope.$eval(attrs.ngOnenter);
                });

                event.preventDefault();
            }
        });
    };
});

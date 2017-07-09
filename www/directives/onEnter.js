

angular.module( "ngOnenter", []).directive('ngOnenter', function () {
    return function (scope, element, attrs) {
        // console.log(scope, 'scopre');
        // console.log(element, 'element');
        console.log(attrs, 'attrs');
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
              console.log('Enter was hit running it!');
              console.log(attrs, 'attrs');
              scope.$apply(function (){
                  console.log(attrs, 'attrs');
                  scope.$eval(attrs.ngOnenter);
                });

                event.preventDefault();
            }
        });
    };
});

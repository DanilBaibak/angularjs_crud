(function () {
    /**
     * Directive for check unique of the form's fields
     *
     * @param productsService - factory for work with DB
     * @returns {{restrict: string, require: string, link: Function}}
     */
    var uniqueDirective = function (productsService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.bind('blur', function (e) {
                    if (!ngModel || !element.val()) return;
                    var keyProperty = scope.$eval(attrs.unique);
                    var currentValue = element.val();
                    productsService.checkUniqueValue(keyProperty.property, currentValue)
                        .then(function (unique) {
                            //Ensure value that being checked hasn't changed
                            //since the Ajax call was made
                            if (currentValue === element.val()) {
                                ngModel.$setValidity('unique', unique);
                                console.log(unique);
                            }
                        }, function () {
                            //Probably want a more robust way to handle an error
                            //For this demo we'll set unique to true though
                            ngModel.$setValidity('unique', true);
                        });
                });
            }
        };
    };

    productsManager.productsApp.directive('unique', ['productsService', uniqueDirective]);

}());
(function(){
    /**
     * Controller for the page of adding new product
     *
     * @param $scope
     * @param $location
     * @param productsService - factory to work with DB
     * @param modalService - service for using modal windows
     */
    var addProductController = function ($scope, $location, productsService, modalService) {
        var modalOptions = {
            closeButtonText: 'Ok',
            headerText: 'Error!'
        };
        init();

        /**
         * Set list of the products and shippers
         */
        function init() {
            //get list of the groups
            productsService.getGroups()
                .success(function (groups) {
                    $scope.groups = groups;
                })
                .error(function () {
                    modalOptions.bodyText = 'An error occurred! Unable to load group data!';
                    modalService.showModal({}, modalOptions);
                });

            //get list of the shippers
            productsService.getShippers()
                .success(function (shippers) {
                    $scope.shippers = shippers;
                })
                .error(function () {
                    modalOptions.bodyText = 'An error occurred! Unable to load shipper data!';
                    modalService.showModal({}, modalOptions);
                });
        };

        /**
         * Send input data to the server
         */
        $scope.addNewProduct = function() {
            //get data from form
            var data = $scope.addProductForm;
            //fix for 'select'
            data.group = data.group.value;
            data.shipper = data.shipper.value;

            //send data of the new product to the server
            productsService.addProduct(data)
                .success(function(response) {
                    //if new product was added
                    if (response) {
                        $location.path('/');
                    } else {
                        modalOptions.bodyText = 'An error occurred! Please, reload page and try again.';
                        modalService.showModal({}, modalOptions);
                    }
                })
                .error(function() {
                    modalOptions.bodyText = 'An error occurred! Server is unavailable. Please, try later.';
                    modalService.showModal({}, modalOptions);
                });
        };
    };

    productsManager.productsApp.controller(
        'AddProductController',
        ['$scope', '$location', 'productsService', 'modalService', addProductController]
    );
}());

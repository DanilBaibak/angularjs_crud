(function(){
    /**
     * Controller for the page of editing new product
     *
     * @param $scope
     * @param $location
     * @param productsService - factory to work with DB
     * @param $routeParams
     * @param modalService - service for using modal windows
     */
    var editProductController = function ($scope, $location, productsService, $routeParams, modalService) {
        var modalOptions = {
            closeButtonText: 'Ok',
            headerText: 'Error!'
        };
        init();

        /**
         * Set list of the products, groups and shippers
         */
        function init() {
            /**
             * Get current product by id of the product
             * For populating the group and the shipper we need select it from all groups and shippers.
             * That's why we getting groups and shippers after we get the product
             *
             * $routeParams.product int - id of the product
             */
            productsService.getProduct($routeParams.product)
                .success(function (product) {
                    if (product) {
                        $scope.editProductForm = product[0]
                        //fix for digit
                        $scope.editProductForm.count = parseInt(product[0].count);
                        $scope.editProductForm.cost = parseInt(product[0].cost);
                    } else {
                        return $location.url('/404');
                    }

                })
                .error(function () {
                    modalOptions.bodyText = 'An error occurred! Unable to load customer data!';
                    modalService.showModal({}, modalOptions);
                }).then(function () {
                    //get list of the groups
                    productsService.getGroups()
                        .success(function (groups) {
                            $scope.groups = groups;
                            /**
                             * Select group of the product
                             *
                             * @type object - group
                             */
                            var group = $scope.groups.filter(function(group) {
                                return group.value === $scope.editProductForm.group;
                            });
                            $scope.editProductForm.group = group[0];

                        })
                        .error(function () {
                            modalOptions.bodyText = 'An error occurred! Unable to load group data!';
                            modalService.showModal({}, modalOptions);
                        });

                    //get list of the shippers
                    productsService.getShippers()
                        .success(function (shippers) {
                            $scope.shippers = shippers;
                            /**
                             * Select shipper of the product
                             *
                             * @type object - shipper
                             */
                            var shipper = $scope.shippers.filter(function(shipper) {
                                return shipper.value === $scope.editProductForm.shipper;
                            });
                            $scope.editProductForm.shipper = shipper[0];
                        })
                        .error(function () {
                            modalOptions.bodyText = 'An error occurred! Unable to load shipper data!';
                            modalService.showModal({}, modalOptions);
                        });
                });
        };

        /**
         * Send input data to the server for updating
         */
        $scope.editProduct = function() {
            var data = $scope.editProductForm;
            data.group =  data.group.value;
            data.shipper =  data.shipper.value;

            //send data of the new product to the server
            productsService.updateProduct(data)
                .success(function(response) {
                    //if new product was added
                    if (response) {
                        return $location.url('/');
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
        'EditProductController',
        ['$scope', '$location', 'productsService', '$routeParams', 'modalService', editProductController]
    );
}());

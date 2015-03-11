(function() {
    /**
     * Default page for showing list of the products
     *
     * @param $scope
     * @param $location
     * @param productsService - factory to work with DB
     * @param modalService - service for using modal windows
     * @param confirmService - service for using modal windows for confirming  different questions
     */
    var productsController = function($scope, $location, productsService, modalService, confirmService) {
        var modalOptions = {
            closeButtonText: 'Ok',
            headerText: 'Error!'
        };
        init();

        /**
         * Set list of the group, products and shippers
         */
        function init() {
            /**
             *Get list of the products
             */
            productsService.getData()
                .success(function (products) {
                    $scope.products = products;
                })
                .error(function () {
                    modalOptions.bodyText = "An error occurred! Unable to load product data!";
                    modalService.showModal({}, modalOptions);
                });

            /**
             * Get list of the groups
             */
            productsService.getGroups()
                .success(function (groups) {
                    $scope.groups = groups;
                })
                .error(function () {
                    modalOptions.bodyText = "An error occurred! Unable to load group data!";
                    modalService.showModal({}, modalOptions);
                });

            /**
             * Get list of the shippers
             */
            productsService.getShippers()
                .success(function (shippers) {
                    $scope.shippers = shippers;
                })
                .error(function () {
                    modalOptions.bodyText = "An error occurred! Unable to load shipper data";
                    modalService.showModal({}, modalOptions);
                });

        }

        /**
         * Redirect to page for adding new product
         * @returns object - $location
         */
        $scope.addNewProductPage = function () {
            return $location.url('/new_product');
        };

        /**
         * Remove product from DB and from grid
         *
         * @param id int - id of the current product
         * @param productName string - name of the current product
         * @param index int - id of the current product in the scope
         */
        $scope.removeProduct = function(id, productName, index) {
            //settings for the confirm window
            var confirmOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Remove',
                headerText: 'Remove product',
                bodyText: 'Are you sure, that want remove product' + productName + '?'
            };

            //show modal window and ask for confirmation of the removing
            confirmService.showModal({}, confirmOptions).then(function (result) {
                if (result) {
                    //send ajax request for remove current product from DB
                    productsService.removeProduct(id)
                        .success(function(response) {
                            //if product was successful removed from DB, remove it from scope
                            if (response) {
                                $scope.products.splice($scope.products.indexOf(index), 1);
                            } else {
                                var modalOptions = {
                                    closeButtonText: 'Ok',
                                    headerText: 'Error!',
                                    bodyText: 'An error occurred! Please, reload page and try again.'
                                };

                                modalService.showModal({}, modalOptions);
                            }
                        })
                        .error(function() {
                            var modalOptions = {
                                closeButtonText: 'Ok',
                                headerText: 'Error!',
                                bodyText: 'An error occurred! Unable to delete current product!'
                            };

                            modalService.showModal({}, modalOptions);
                        });
                }
            });
        };

        /**
         * Redirect to the page for edit current product
         * @param index int - id of the cproduct
         * @returns $location
         */
        $scope.editProduct = function(index) {
            return $location.url('/edit?product=' + index);
        }
    };

    productsManager.productsApp.controller(
        'ProductsController',
        ['$scope', '$location', 'productsService', 'modalService', 'confirmService', productsController]
    );
}());
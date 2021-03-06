(function() {
    /**
     * Factory for get and set data to the server
     *
     * @param $http service for create ajax request
     * @returns object factory
     */
    var productsService = function($http, apiUrl) {
        productsFactory = {};

        /**
         * Get list of the products
         * @returns object $http
         */
        productsFactory.getData = function () {
            return $http.get(apiUrl + 'products');
        };

        /**
         * Get list of the groups
         * @returns object $http
         */
        productsFactory.getGroups = function () {
            return $http.get(apiUrl + 'groups');
        };

        /**
         * Get list of the shippers
         * @returns object $http
         */
        productsFactory.getShippers = function () {
            return $http.get(apiUrl + 'shippers');
        };

        /**
         * Add products to DB
         *
         * @param data object with data that would be added
         * @returns object $http
         */
        productsFactory.addProduct = function (data) {
            return $http.post(apiUrl + 'products', data);
        }

        /**
         * Remove product from DB
         * @param id id of the current product
         * @returns object $http
         */
        productsFactory.removeProduct = function (id) {
            return $http({
                method: 'DELETE',
                url: apiUrl + 'product/' + id
            });
        }

        /**
         * Get current product by id
         *
         * @param id int - id of the product
         * @returns object of the $http
         */
        productsFactory.getProduct = function(id) {
            return $http.get(apiUrl + 'product/' + id);
        }

        /**
         * Update data for current product
         *
         * @param postData object - data
         * @returns object of the $http
         */
        productsFactory.updateProduct = function(postData) {
            return $http.put(apiUrl + 'product/'+ postData['id'], postData);
        }

        /**
         * Check unique value for some field
         *
         * @param string property - name of the property on which check
         * @param string value - value of the property on which check
         * @returns {*}
         */
        productsFactory.checkUniqueValue = function (property, value) {
            return $http({
                url: apiUrl + 'product/check_unique_value',
                method: 'GET',
                params: {field: 'name', value: escape(value)}
            })
                .then(function (results) {
                    return results.data.status;
                });
        };

        return productsFactory;
    };

    productsManager.productsApp.factory('productsService', ['$http', 'apiUrl', productsService]);
}());
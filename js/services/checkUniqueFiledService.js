(function () {
    /**
     * Factory for get and set data to the server
     *
     * @param $http service for create ajax request
     * @returns object factory
     */
    var checkUniqueFiledService = function ($http) {
        var serviceBase = '/api/dataservice/',
            dataFactory = {};

        dataFactory.checkUniqueValue = function (id, property, value) {
            var id = !id ? id : 0;

            return $http.get(serviceBase + 'checkUnique/' + id + '?property=' + property + '&value=' + escape(value))
                .then(function (results) {
                    return results.data.status;
                });
        };
        return dataFactory;
    };

    productsManager.productsApp.factory('checkUniqueFiledService', ['$http', checkUniqueFiledService]);
}());
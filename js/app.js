var productsManager = {};
productsManager.productsApp = {};

(function() {
    //Create application
    productsManager.productsApp = angular.module('ngCrud', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

    //Configure routing
    productsManager.productsApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/manager_panel.html',
                controller: 'ProductsController'
            })
            .when('/new_product', {
                templateUrl: 'views/new_product.html',
                controller: 'AddProductController'
            })
            .when('/edit', {
                templateUrl: 'views/edit_product.html',
                controller: 'EditProductController'
            })
            .when('/404', {
                templateUrl: 'views/404.html',
                controller: 'Error'
            })
            .otherwise({redirectTo: '/404'});
    }]);
})();
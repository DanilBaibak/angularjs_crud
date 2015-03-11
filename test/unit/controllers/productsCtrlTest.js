'use strict';

describe('Controller: ProductsController', function() {
    var $controller,
        productsController,
        $scope,
        httpMock,
        location;

    beforeEach(module('ngCrud'));

    //some mock data
    var productsData = [
        {"id":"3","name":"olol","count":"23","cost":"211","group":"Phone","shipper":"Sony"},
        {"id":"5","name":"ololo","count":"12","cost":"12","group":"Phone","shipper":"Nokia"}
    ];
    var shippers = [{"value":"Apple","text":"Apple"},{"value":"Nokia","text":"Nokia"},{"value":"Sony","text":"Sony"}];
    var groups = [{"value":"LapTop","text":"LapTop"},{"value":"Phone","text":"Phone"},{"value":"Table","text":"Table"}];

    beforeEach(inject(function(_$controller_, $rootScope, $httpBackend, $location) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = $rootScope.$new();
        httpMock = $httpBackend;
        location = $location;
        productsController = $controller('ProductsController', {$scope: $scope});
    }));

    describe('Controller: Product ', function() {
        it('should be defined', function() {
            expect(productsController).toBeDefined();
        });

        it('should get data of the "products", "shippers" and "groups" during initializing productsController', function () {
            //create mocks for the requests
            httpMock.whenGET("http://rest_my.work/products").respond(productsData);
            httpMock.whenGET("http://rest_my.work/shippers").respond(shippers);
            httpMock.whenGET("http://rest_my.work/groups").respond(groups);

            httpMock.flush();

            expect($scope.products).toEqual(productsData);
            expect($scope.shippers).toEqual(shippers);
            expect($scope.groups).toEqual(groups);
        });

        it('should change location for edit current product', function() {
            $scope.editProduct('someProduct');
            expect(location.url()).toBe('/edit?product=someProduct');
        });

        it('should change location for add new product', function() {
            $scope.addNewProductPage();
            expect(location.url()).toBe('/new_product');
        });
    });
});
'use strict';

describe('Controller: EditProduct', function() {
    var $controller,
        editProductController,
        $scope,
        routeParams,
        httpMock,
        location;

    beforeEach(module('ngCrud'));

    var product = {
        "id": "3", "name": "olol", "count": 23, "cost": 211,
        group: Object({value: 'Phone', text: 'Phone'}),
        shipper: Object({value: 'Sony', text: 'Sony'})
    };
    var productData = [{"id":"3","name":"olol","count":"23","cost":"211","group":"Phone","shipper":"Sony"}];
    var shippers = [{"value":"Apple","text":"Apple"},{"value":"Nokia","text":"Nokia"},{"value":"Sony","text":"Sony"}];
    var groups = [{"value":"LapTop","text":"LapTop"},{"value":"Phone","text":"Phone"},{"value":"Table","text":"Table"}];

    beforeEach(inject(function(_$controller_, $rootScope, $httpBackend, $location, $routeParams) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = $rootScope.$new();
        httpMock = $httpBackend;
        location = $location;
        routeParams = $routeParams;
        routeParams.product = 3;
        editProductController = $controller('EditProductController', {$scope: $scope});
    }));

    it('should be defined', function() {
        expect(editProductController).toBeDefined();
    });

    it('should get data of the "shippers" and "group" during initializing EditProductController', function () {
        //create mocks for the requests
        httpMock.whenGET("http://rest_my.work/shippers").respond(shippers);
        httpMock.whenGET("http://rest_my.work/groups").respond(groups);
        httpMock.whenGET("http://rest_my.work/product/3").respond(productData);

        httpMock.whenPOST("http://rest_my.work/products", product).respond(200, true);

        httpMock.flush();

        expect($scope.editProductForm).toEqual(product);
        expect($scope.shippers).toEqual(shippers);
        expect($scope.groups).toEqual(groups);
    });
});
'use strict';

describe('Controller addProductController', function() {
    var $controller,
        addProductController,
        $scope,
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

    beforeEach(inject(function(_$controller_, $rootScope, $httpBackend, $location) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = $rootScope.$new();
        httpMock = $httpBackend;
        location = $location;
        addProductController = $controller('AddProductController', {$scope: $scope});
    }));

    it('should be defined', function() {
        expect(addProductController).toBeDefined();
    });

    it('should get data of the "shippers" and "group" during initializing EditProductController', function () {
        //create mocks for the requests
        httpMock.whenGET("http://rest_my.work/shippers").respond(shippers);
        httpMock.whenGET("http://rest_my.work/groups").respond(groups);
        httpMock.flush();

        expect($scope.shippers).toEqual(shippers);
        expect($scope.groups).toEqual(groups);
    });
});
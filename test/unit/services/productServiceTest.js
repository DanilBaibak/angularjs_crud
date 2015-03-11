'use strict'

var productsService,
    $httpBackend,
    apiUrl;

describe('Service ProductService ', function() {
    beforeEach(module('ngCrud'));

    beforeEach(inject(function(_productsService_, _$httpBackend_, _apiUrl_) {
        productsService = _productsService_;
        $httpBackend = _$httpBackend_;
        apiUrl = _apiUrl_;
    }));

    it('should be defined', function() {
        expect(productsService).toBeDefined();
    });

    /**
     * Test all requests from 'productsService'
     */
    beforeEach(function() {
        $httpBackend.expectGET(apiUrl + 'products').respond(200, {});
        $httpBackend.expectGET(apiUrl + 'groups').respond(200, {});
        $httpBackend.expectGET(apiUrl + 'shippers').respond(200, {});
        $httpBackend.expectGET(apiUrl + 'product/' + 777).respond(200, {});
        $httpBackend.expectPOST(apiUrl + 'products', 777).respond(200, {});
        $httpBackend.expectDELETE(apiUrl + 'product/' + 777).respond(200, {});
        $httpBackend.expectPUT(apiUrl + 'product/' + 777, {id: 777}).respond(200, {});
        $httpBackend.expectGET(apiUrl + 'product/check_unique_value?field=name&value=someValue').respond(200, {});

        productsService.getData();
        productsService.getGroups();
        productsService.getShippers();
        productsService.getProduct(777);
        productsService.addProduct(777);
        productsService.removeProduct(777);
        productsService.updateProduct({id: 777});
        productsService.checkUniqueValue('someProperty', 'someValue');
        $httpBackend.flush();
    });

    it('should send an HTTP POST request', function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
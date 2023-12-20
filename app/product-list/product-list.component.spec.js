"use strict";

describe("productList", function () {
  // Load the module that contains the `productList` component before each test
  beforeEach(module("productList"));

  // Test the controller
  describe("productListController", function () {
    var $httpBackend, ctrl;

    beforeEach(inject(function ($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend
        .expectGET("products/products.json")
        .respond([{ name: "Nexus S" }, { name: "Motorola DROID" }]);

      ctrl = $componentController("productList");
    }));

    it("should create a `products` property with 2 products fetched with `$http`", function () {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.products).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.products).toEqual([
        { name: "Nexus S" },
        { name: "Motorola DROID" },
      ]);
    });

    it("should set a default value for the `orderProp` property", function () {
      expect(ctrl.orderProp).toBe("age");
    });
  });
});

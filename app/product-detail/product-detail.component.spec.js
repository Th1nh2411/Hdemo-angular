"use strict";

describe("productDetail", function () {
  // Load the module that contains the `productDetail` component before each test
  beforeEach(module("productDetail"));

  // Test the controller
  describe("productDetailController", function () {
    var $httpBackend, ctrl;
    var xyzproductData = {
      name: "product xyz",
      images: ["image/url1.png", "image/url2.png"],
    };

    beforeEach(inject(function (
      $componentController,
      _$httpBackend_,
      $routeParams
    ) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET("products/xyz.json").respond(xyzproductData);

      $routeParams.productId = "xyz";

      ctrl = $componentController("productDetail");
    }));

    it("should fetch the product details", function () {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.product).toEqual({});

      $httpBackend.flush();
      expect(ctrl.product).toEqual(xyzproductData);
    });
  });
});

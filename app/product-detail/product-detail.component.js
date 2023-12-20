"use strict";

// Register `productDetail` component, along with its associated controller and template
angular.module("productDetail").component("productDetail", {
  templateUrl: "product-detail/product-detail.template.html",
  controller: [
    "$routeParams",
    "Product",
    function PhoneDetailController($routeParams, Product) {
      var self = this;

      self.stars = Array.from({ length: 5 }, (_, index) => index + 1);

      self.product = Product.get(
        { productId: $routeParams.productId },
        function (product) {
          self.setImage(product.images[0]);
        }
      );

      self.setImage = function setImage(imageUrl) {
        self.mainImageUrl = imageUrl;
      };
    },
  ],
});
